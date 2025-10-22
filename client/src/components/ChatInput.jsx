import React from 'react';

export default function ChatInput({ 
  value, 
  onChange, 
  onSendMessage,
  disabled 
}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendMessage) {
      onSendMessage();
    }
  };
  
  return (
    <div style={{ 
      padding: '20px',
      borderTop: '1px solid'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your message..."
            disabled={disabled}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            style={{
              padding: '12px 24px',
              border: '1px solid',
              borderRadius: '8px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
