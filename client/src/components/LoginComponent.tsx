import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../reducers/actions'

interface LoginFormProps {
  onClose: () => void;
  onSubmit: (username: string, password: string) => void; // Callback for successful login
}

const LoginComponent: React.FC<LoginFormProps> = ({ onClose, onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator

  const dispatch = useDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(null); // Clear error when user starts typing again
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null); // Clear error when user starts typing again
  };

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear any previous errors before submission
    setIsLoading(true); // Show loading indicator

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed'); // Provide more specific error message (if available)
      } else {
        const data = await response.json();

        // Handle successful login (store JWT token securely)
        const token = data.accessToken; // Assuming the backend sends the token in the response
        storeToken(token); // Implement secure token storage (see next section)
        dispatch(loginSuccess(data.user))
        onSubmit(username, password); // Pass credentials for further processing (optional)
        console.log('Login successful:', data); // Optional logging
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred.'); // Generic error for security
    } finally {
      setIsLoading(false); // Hide loading indicator after request completes
    }
  };

  const storeToken = (token: string) => {
    document.cookie = `jwtToken=${token}; HttpOnly; Secure; SameSite=Strict`;
    console.log('Storing token in HttpOnly cookie'); // Optional logging
  };
  

  return (
    <div className="login-modal" 
      style={{
      backgroundColor: 'darkblue',
      maxWidth: '300px',
      maxHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      padding: '30px',
      right: '0px',
      top: '0',
      zIndex: '999',
      flexDirection: 'column',
    }}>
      <button type="button" onClick={onClose}>&times;</button>
      {/* ... remaining code with CSS modules or styled-components for styles ... */}
      <form onSubmit={handleSubmitLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginComponent;

