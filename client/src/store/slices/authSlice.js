import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../helpers/http';

// Check Authentication - Verify token and get user data
export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    // Decode JWT to get user data (simple base64 decode)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Verify token is still valid by making a simple API call
    await api.get('/products');
    
    return { user: payload, token };
  } catch (err) {
    localStorage.removeItem('access_token');
    return rejectWithValue('Invalid token');
  }
});

// Login Thunk
export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    console.log('✅ Login Response:', data);
    localStorage.setItem('access_token', data.token);
    // Backend returns: { token, id, name, email }
    // We need to structure it properly for the state
    return {
      token: data.token,
      user: {
        id: data.id,
        name: data.name,
        email: data.email
      }
    };
  } catch (err) {
    console.error('❌ Login Error:', err.response?.data);
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Register Thunk - Only create account, don't auto-login
export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    console.log('✅ Register Response:', data);
    // Backend returns: { id, name, email, token }
    // We structure it but don't save token - user needs to login
    return {
      user: {
        id: data.id,
        name: data.name,
        email: data.email
      }
    };
  } catch (err) {
    console.error('❌ Register Error:', err.response?.data);
    return rejectWithValue(err.response?.data?.message || 'Register failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    isAuthenticated: false,
    status: 'idle', 
    error: null 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      localStorage.removeItem('access_token');
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled, payload:', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Don't set user on register - they need to login first
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout, resetStatus, setUser } = authSlice.actions;
export default authSlice.reducer;