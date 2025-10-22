import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import AISupportModal from '../components/AISupportModal';

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Messages</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Chat with other users</p>
        </div>
        <button
          onClick={() => setShowAIModal(true)}
          style={{
            padding: '12px 24px',
            border: '1px solid',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            background: 'white'
          }}
        >
          Need Help? Ask AI
        </button>
      </div>
      
      <div style={{ border: '1px solid', borderRadius: '8px' }}>
        <MessageList messages={messages} loading={loading} onDelete={deleteMessage} />
        <ChatInput 
          value={inputMessage} 
          onChange={setInputMessage} 
          onSendMessage={handleSendMessage}
          disabled={loading} 
        />
      </div>
      
      {error && (
        <div style={{ marginTop: '20px', padding: '12px', border: '1px solid', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <AISupportModal 
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        quickHelp={quickHelp}
      />
    </div>
  );
}
