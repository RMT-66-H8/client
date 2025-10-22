import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // buat socket.io
    }),
});
