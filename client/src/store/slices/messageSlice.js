import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
  error: null,
  quickHelp: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(msg => msg.id !== action.payload);
    },
    setQuickHelp: (state, action) => {
      state.quickHelp = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setMessages,
  addMessage,
  removeMessage,
  setQuickHelp,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
