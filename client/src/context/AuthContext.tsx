import React, { createContext, useState, useEffect } from 'react';

interface User {
  // Define your user object properties here (e.g., username, email, roles)
  username: string;
  role: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => {},
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login: (userData: User) => void = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout: () => void = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const persistedUser = localStorage.getItem('user'); // Replace with your storage method
    if (persistedUser) {
      setUser(JSON.parse(persistedUser) as User); // Type assertion for safety
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
