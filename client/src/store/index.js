import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // buat socket.io
    }),
});
