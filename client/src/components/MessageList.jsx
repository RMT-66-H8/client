import React from 'react';
import { Spinner, Badge, Button, Card } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

export default function MessageList({ messages, loading, onDelete }) {
  
  if (loading) {
    return (
      <div className="p-4 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading messages...</span>
        </Spinner>
        <p className="mt-2 text-muted">Loading messages...</p>
      </div>
    );
  }
  
  if (messages.length === 0) {
    return (
      <div className="p-5 text-center">
        <p className="text-muted">No messages yet. Start chatting with AI Support!</p>
      </div>
    );
  }
  
  return (
    <div 
      className="p-3"
      style={{ 
        maxHeight: '500px', 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {messages.map((message) => (
        <div 
          key={message.id}
          className="d-flex"
          style={{
            justifyContent: message.isAI ? 'flex-start' : 'flex-end',
          }}
        >
          <Card 
            className={`shadow-sm ${message.isAI ? 'border-primary' : 'border-success'}`}
            style={{ maxWidth: '70%' }}
          >
            <Card.Body className="p-3">
              {/* Badge AI atau User */}
              <Badge 
                bg={message.isAI ? 'primary' : 'success'} 
                className="mb-2"
              >
                {message.isAI ? '🤖 AI Support' : '👤 You'}
              </Badge>
              
              {/* Content message */}
              <Card.Text className="mb-2">
                {message.content}
              </Card.Text>
              
              {/* Timestamp dan Delete button */}
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {new Date(message.createdAt).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </small>
                
                {!message.isAI && onDelete && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-danger p-0"
                    onClick={() => onDelete(message.id)}
                  >
                    <Trash size={14} />
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
