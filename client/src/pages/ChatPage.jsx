import { useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { ChatDots } from 'react-bootstrap-icons';
import { useChat } from '../hooks/useChat';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import AISupportModal from '../components/AISupportModal';
import NavbarPage from '../components/NavbarPage';

export default function ChatPage() {
  const {
    messages,
    loading,
    error,
    quickHelp,
    inputMessage,
    setInputMessage,
    sendMessage,
    deleteMessage,
  } = useChat();

  const [showAIModal, setShowAIModal] = useState(false);
  
  const handleSendMessage = () => {
    sendMessage(inputMessage);
  };
  
  
  return (
    <>
      <NavbarPage />
      <Container className="mt-4" style={{ maxWidth: '900px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-1">
              <ChatDots className="me-2" />
              Messages
            </h1>
            <p className="text-muted mb-0">Chat with other users</p>
          </div>
          <Button 
            variant="outline-primary" 
            onClick={() => setShowAIModal(true)}
            size="lg"
          >
            <ChatDots className="me-2" />
            Need Help? Ask AI
          </Button>
        </div>
        
        <Card className="shadow-sm">
          <MessageList messages={messages} loading={loading} onDelete={deleteMessage} />
          <ChatInput 
            value={inputMessage} 
            onChange={setInputMessage} 
            onSendMessage={handleSendMessage}
            disabled={loading} 
          />
        </Card>
        
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <AISupportModal 
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          quickHelp={quickHelp}
        />
      </Container>
    </>
  );
}
