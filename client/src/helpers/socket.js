import { io } from 'socket.io-client';

// Base URL untuk socket connection
const SOCKET_URL =  'http://localhost:3000';

// Buat socket connection instance
export const socket = io(SOCKET_URL, {
  autoConnect: false, // Jangan langsung connect, nanti di-trigger manual
  reconnection: true, // Auto reconnect jika terputus
  reconnectionDelay: 1000, // Delay 1 detik sebelum reconnect
  reconnectionAttempts: 5, // Max 5x gagal reconnect
});

// Helper function untuk connect socket
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    console.log('🔌 Socket connecting...');
  }
};

// Helper function disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log('🔌 Socket disconnected');
  }
};
