import React from 'react';

export default function MessageList({ messages, loading, onDelete }) {
  
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading messages...</p>
      </div>
    );
  }
  
  if (messages.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>No messages yet. Start chatting with AI Support!</p>
      </div>
    );
  }
  
  return (
    <div style={{ 
      padding: '20px', 
      maxHeight: '500px', 
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {messages.map((message) => (
        <div 
          key={message.id}
          style={{
            padding: '12px 16px',
            border: '1px solid',
            borderRadius: '8px',
            maxWidth: '70%',
            alignSelf: message.isAI ? 'flex-start' : 'flex-end',
          }}
        >
          {/* Badge AI atau User */}
          <div style={{ 
            fontSize: '12px', 
            marginBottom: '5px',
            fontWeight: 'bold'
          }}>
            {message.isAI ? 'AI Support' : 'You'}
          </div>
          
          {/* Content message */}
          <div style={{ fontSize: '14px' }}>
            {message.content}
          </div>
          
          {/* Timestamp dan Delete button */}
          <div style={{ 
            fontSize: '10px', 
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>
              {new Date(message.createdAt).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            
            {!message.isAI && onDelete && (
              <button 
                onClick={() => onDelete(message.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '2px 6px'
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
