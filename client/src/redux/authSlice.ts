import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AppThunk } from './store'; // Adjust the path as necessary

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  image: string;
  verified: boolean;
  roles: string[];
  banned: boolean; // This field will not be displayed in the UI
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  roles: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: Cookies.get('auth_token') || null,
  roles: [],
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
      Cookies.set('auth_token', action.payload.token, { expires: 7 });
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user)); // Store user in localStorage
      localStorage.setItem('auth_roles', JSON.stringify(action.payload.roles)); // Store roles in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.roles = [];
      Cookies.remove('auth_token');
      localStorage.removeItem('auth_user'); // Remove user from localStorage
      localStorage.removeItem('auth_roles'); // Remove roles from localStorage
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('auth_user', JSON.stringify(action.payload)); // Update user in localStorage
    },
  },
});

export const { loginSuccess, logout, updateUserSuccess } = authSlice.actions;

export const initializeLoginState = (): AppThunk => (dispatch) => {
  const token = Cookies.get('auth_token');
  const storedUser = localStorage.getItem('auth_user');
  const storedRoles = localStorage.getItem('auth_roles');
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (token && user) {
    dispatch(loginSuccess({ user, token, roles }));
  }
};

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Login failed');
    } else {
      const data = await response.json();
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        image: data.image,
        verified: data.verified,
        roles: data.roles,
        banned: data.banned,
      };
      const token = data.accessToken;
      dispatch(loginSuccess({ user: userData, token, roles: data.roles }));
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const updateUser = (id: string, formData: FormData): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Update failed');
    } else {
      const data: User = await response.json();
      dispatch(updateUserSuccess(data));
    }
  } catch (error) {
    console.error('Update error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};


export default authSlice.reducer;

