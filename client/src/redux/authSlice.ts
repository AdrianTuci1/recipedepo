import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AppThunk } from './store'; // Adjust the path as necessary

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  roles: string[]; // Include roles in the state
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: Cookies.get('auth_token') || null, // Initialize token from cookie
  roles: [], // Initialize roles array
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; roles: string[] }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      Cookies.set('auth_token', action.payload.token, { expires: 7 }); // Store token in cookie for 7 days
      localStorage.setItem('auth_roles', JSON.stringify(action.payload.roles)); // Store roles in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.roles = [];
      Cookies.remove('auth_token'); // Remove token from cookie on logout
      localStorage.removeItem('auth_roles'); // Remove roles from localStorage on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

// Thunk action for initializing login state from localStorage
export const initializeLoginState = (): AppThunk => (dispatch) => {
  const token = Cookies.get('auth_token');
  const storedRoles = localStorage.getItem('auth_roles');
  const roles = storedRoles ? JSON.parse(storedRoles) : [];

  if (token) {
    // You may need to fetch user details based on the token
    const user = getUserFromToken(token); // Implement this function to extract user details from token
    dispatch(loginSuccess({ user, token, roles }));
  }
};

// Helper function to extract user details from token
const getUserFromToken = (token: string): User => {
  // Example: Decode token and extract user details
  // Replace with your actual token decoding logic
  const decodedToken = atob(token.split('.')[1]);
  const user: User = JSON.parse(decodedToken);
  return user;
};

export default authSlice.reducer;

