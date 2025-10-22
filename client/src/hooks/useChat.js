import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../helpers/http';
import { socket, connectSocket, disconnectSocket } from '../helpers/socket';
import { setMessages, addMessage, removeMessage, setQuickHelp, setLoading, setError } from '../store/slices/messageSlice';
import Swal from 'sweetalert2';

export const useChat = () => {
  const dispatch = useDispatch();
  const { messages, loading, error, quickHelp } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth); // Get user from auth state
  const [inputMessage, setInputMessage] = useState('');
  
  useEffect(() => {
    connectSocket();
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
    
    socket.on('message:new', (newMessage) => {
      console.log('New message received:', newMessage);
      dispatch(addMessage(newMessage));
    });
    
    socket.on('message:deleted', (messageId) => {
      console.log('Message deleted:', messageId);
      dispatch(removeMessage(messageId));
    });
    
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
    
    return () => {
      disconnectSocket();
    };
  }, [dispatch]);
  
  useEffect(() => {
    fetchAllMessages();
    fetchQuickHelpTopics();
  }, []);
  
  const fetchAllMessages = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await http.get('/messages');
      dispatch(setMessages(data.messages || []));
    } catch (err) {
      console.error('Error fetching messages:', err);
      dispatch(setError(err.response?.data?.message || 'Failed to load messages'));
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Messages',
        text: err.response?.data?.message || 'An error occurred',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const fetchQuickHelpTopics = async () => {
    try {
      const { data } = await http.get('/messages/quick-help');
      dispatch(setQuickHelp(data || []));
    } catch (err) {
      console.error('Error fetching quick help:', err);
    }
  };
  
  const sendMessage = async (content) => {
    if (!content.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Message',
        text: 'Please write a message first',
      });
      return;
    }
    
    try {
      const { data } = await http.post('/messages', { content });
      setInputMessage('');
      return data.message;
    } catch (err) {
      console.error('Error sending message:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Message',
        text: err.response?.data?.message || 'An error occurred',
      });
    }
  };
  
  const requestAIResponse = async (userMessage, userId) => {
    try {
      const { data } = await http.post('/messages/ai', {
        content: userMessage,
        userId: userId
      });
      return data.data;
    } catch (err) {
      console.error('Error requesting AI response:', err);
      Swal.fire({
        icon: 'error',
        title: 'AI Not Responding',
        text: err.response?.data?.message || 'An error occurred',
      });
    }
  };
  
  const deleteMessage = async (messageId) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Message?',
        text: 'This message cannot be recovered',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'Cancel',
      });
      
      if (result.isConfirmed) {
        await http.delete(`/messages/${messageId}`);
        Swal.fire('Deleted!', 'Message has been deleted', 'success');
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Delete',
        text: err.response?.data?.message || 'An error occurred',
      });
    }
  };
  
  const sendMessageWithAI = async (content) => {
    const userMessage = await sendMessage(content);
    if (userMessage && user) {
      setTimeout(() => {
        requestAIResponse(content, user.id);
      }, 500);
    }
  };
  
  return {
    // State
    messages,
    loading,
    error,
    quickHelp,
    inputMessage,
    
    setInputMessage,
    sendMessage,
    sendMessageWithAI,
    requestAIResponse,
    deleteMessage,
    fetchAllMessages,
  };
};
