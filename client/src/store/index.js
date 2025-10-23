import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // buat socket.io
    }),
});
