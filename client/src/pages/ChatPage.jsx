import { useState, useMemo, useEffect } from 'react';
import { Container, Card, Alert, Row, Col } from 'react-bootstrap';
import { ChatDots, People } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import UserList from '../components/UserList';
import NavbarPage from '../components/NavbarPage';
import { http } from '../helpers/http';
import { socket } from '../helpers/socket';

export default function ChatPage() {
  const { user } = useSelector((state) => state.auth);
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersLoading, setUsersLoading] = useState(true);

  const {
    messages,
    loading,
    error,
    inputMessage,
    setInputMessage,
    sendMessage,
    deleteMessage,
  } = useChat();

  // Fetch all registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await http.get('/auth/users');
        setAllUsers(data.users || []);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Join socket with user data and listen for online users
  useEffect(() => {
    if (user && socket.connected) {
      socket.emit('user:join', {
        userId: user.id,
        name: user.name,
        email: user.email
      });
    }

    socket.on('users:online', (users) => {
      console.log('📊 Online users updated:', users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off('users:online');
    };
  }, [user]);

  // Filter messages based on selected user
  const filteredMessages = useMemo(() => {
    // Filter out AI messages
    const userMessages = messages.filter(msg => !msg.User?.isAI);
    
    if (!selectedUser) {
      // Show all messages (broadcast + all private messages)
      return userMessages;
    }
    
    // Show messages between current user and selected user
    // Also include broadcast messages (receiverId = null)
    return userMessages.filter(msg => {
      // Broadcast messages (visible to everyone)
      if (msg.receiverId === null) {
        return true;
      }
      
      // Private messages between current user and selected user
      return (
        (msg.senderId === user?.id && msg.receiverId === selectedUser.id) ||
        (msg.senderId === selectedUser.id && msg.receiverId === user?.id)
      );
    });
  }, [messages, selectedUser, user]);

  const handleSendMessage = () => {
    if (!selectedUser) {
      // Broadcast to all
      sendMessage(inputMessage);
    } else {
      // Send to specific user (implement this in backend if needed)
      sendMessage(inputMessage, selectedUser.id);
    }
  };
  
  const getChatTitle = () => {
    if (!selectedUser) {
      return 'All Users Chat Room';
    }
    return `Chat with ${selectedUser.name}`;
  };
  
  return (
    <>
      <NavbarPage />
      <Container className="mt-4 mb-5" style={{ maxWidth: '1400px' }}>
        <div className="mb-4">
          <h1 className="mb-1 text-primary-custom" style={{ fontWeight: 'bold' }}>
            <ChatDots className="me-2" />
            Messages
          </h1>
          <p className="text-muted mb-0">
            <People className="me-2" />
            Chat with other users in real-time • {filteredMessages.length} messages
            {selectedUser && ` • Chatting with ${selectedUser.name}`}
          </p>
        </div>
        
        <Row>
          {/* User List Sidebar */}
          <Col md={4} lg={3} className="mb-3">
            <UserList
              users={allUsers}
              onlineUsers={onlineUsers}
              loading={usersLoading}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              currentUserId={user?.id}
            />
          </Col>

          {/* Chat Area */}
          <Col md={8} lg={9}>
            <Card className="shadow-lg" style={{ borderRadius: '20px', border: 'none' }}>
              <Card.Header 
                className="border-0" 
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  borderRadius: '20px 20px 0 0',
                  padding: '20px'
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">
                      <ChatDots className="me-2" />
                      {getChatTitle()}
                    </h5>
                    <small style={{ opacity: 0.9 }}>
                      💬 Real-time messaging with Socket.IO
                    </small>
                  </div>
                  {selectedUser && (
                    <div 
                      style={{ 
                        background: 'rgba(255,255,255,0.2)', 
                        padding: '8px 15px', 
                        borderRadius: '20px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedUser(null)}
                      title="Back to all chats"
                    >
                      <People className="me-2" />
                      View All
                    </div>
                  )}
                </div>
              </Card.Header>
              <MessageList messages={filteredMessages} loading={loading} onDelete={deleteMessage} />
              <ChatInput 
                value={inputMessage} 
                onChange={setInputMessage} 
                onSendMessage={handleSendMessage}
                disabled={loading}
                placeholder={selectedUser ? `Message ${selectedUser.name}...` : 'Message all users...'}
              />
            </Card>
            
            {error && (
              <Alert variant="danger" className="mt-3" style={{ borderRadius: '15px' }}>
                {error}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
