import React from 'react';
import RegisterForm from '../components/RegisterComponent'; // Import the form component

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const handleRegistration = async (data: { username: string; email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // Send registration data as JSON
      });

      if (!response.ok) {
        throw new Error(`Registration failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle successful registration (e.g., redirect, display success message)
      console.log('Registration successful:', responseData);
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration errors (e.g., display error message)
    }
  };

  return (
    <div className="register-page">
      <div className="pluses"></div>
      <RegisterForm onSubmit={handleRegistration} />
      <div className="pluses"></div>
    </div>
  );
};

export default RegisterPage;

