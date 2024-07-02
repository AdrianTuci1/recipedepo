import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store'; // Adjust the path as necessary
import { 
  setAuthToken, getAuthToken, removeAuthToken,
  setAuthUser, getAuthUser, removeAuthUser,
  setAuthRoles, getAuthRoles, removeAuthRoles 
} from './storage';

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  image: string;
  verified: boolean;
  roles: string[];
  banned: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  roles: string[];
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: getAuthToken(),
  roles: [],
  error: null,
  loading: true,
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
      state.error = null;
      state.loading = false;
      setAuthToken(action.payload.token);
      setAuthUser(action.payload.user);
      setAuthRoles(action.payload.roles);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.roles = [];
      state.error = null;
      state.loading = false;
      removeAuthToken();
      removeAuthUser();
      removeAuthRoles();
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setAuthUser(action.payload);
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserSuccess, authFailure, setLoading } = authSlice.actions;

const setAuthStateFromStorage = (dispatch: any) => {
  const token = getAuthToken();
  const user = getAuthUser();
  const roles = getAuthRoles();

  if (token && user) {
    dispatch(loginSuccess({ user, token, roles }));
  } else {
    dispatch(setLoading(false));
  }
};

export const initializeLoginState = (): AppThunk => (dispatch) => {
  setAuthStateFromStorage(dispatch);
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
      const userData: User = {
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
  } catch (error: any) {
    console.error('Login error:', error);
    dispatch(authFailure(error.message));
  }
};

export const updateUser = (id: string, formData: FormData): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Update failed');
    } else {
      const data: User = await response.json();
      dispatch(updateUserSuccess(data));
    }
  } catch (error: any) {
    console.error('Update error:', error);
    dispatch(authFailure(error.message));
  }
};

export const logout = (): AppThunk => (dispatch) => {
  dispatch(logoutSuccess());
};

export default authSlice.reducer;
