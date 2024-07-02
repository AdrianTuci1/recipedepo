import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout, updateUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const UserSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state with user data or empty strings
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update state if user data changes
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (user) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      if (image) {
        formData.append('image', image);
      }

      try {
        await dispatch(updateUser(user.id, formData) as any);
        setError('User information updated successfully');
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout() as any);
    navigate('/'); // Redirect to login or home page after logout
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Settings</h1>
      <form onSubmit={handleUpdateUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <button onClick={handleLogout} className="btn btn-secondary">
        Logout
      </button>
    </div>
  );
};

export default UserSettings;

