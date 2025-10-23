import React from 'react';
import { Spinner, Badge, Button, Card } from 'react-bootstrap';
import { Trash, Robot, PersonCircle } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

export default function MessageList({ messages, loading, onDelete }) {
  const { user } = useSelector((state) => state.auth);
  
  if (loading) {
    return (
      <div className="p-4 text-center">
        <Spinner animation="border" role="status" style={{ color: '#10b981' }}>
          <span className="visually-hidden">Loading messages...</span>
        </Spinner>
        <p className="mt-2 text-muted">Loading messages...</p>
      </div>
    );
  }
  
  if (messages.length === 0) {
    return (
      <div className="p-5 text-center">
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💬</div>
        <h5 style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '10px' }}>
          No Messages Yet
        </h5>
        <p className="text-muted">Be the first to start the conversation!</p>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          Your messages will appear here in real-time 🚀
        </p>
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
      {messages.map((message) => {
        const isAI = message.User?.isAI || false;
        const isOwnMessage = user && message.userId === user.id;
        
        return (
          <div 
            key={message.id}
            className="d-flex"
            style={{
              justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
            }}
          >
            <Card 
              className="shadow-sm"
              style={{ 
                maxWidth: '70%',
                background: isAI 
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : isOwnMessage
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : '#f3f4f6',
                border: 'none'
              }}
            >
              <Card.Body className="p-3">
                {/* Badge AI atau User */}
                <div className="d-flex align-items-center mb-2">
                  {isAI ? (
                    <>
                      <Robot size={18} className="me-2" style={{ color: '#10b981' }} />
                      <Badge bg="success" style={{ background: '#10b981' }}>
                        AI Support
                      </Badge>
                    </>
                  ) : isOwnMessage ? (
                    <>
                      <PersonCircle size={18} className="me-2" style={{ color: 'white' }} />
                      <Badge bg="light" text="dark">
                        You
                      </Badge>
                    </>
                  ) : (
                    <>
                      <PersonCircle size={18} className="me-2" style={{ color: '#6b7280' }} />
                      <Badge bg="secondary">
                        {message.User?.name || 'User'}
                      </Badge>
                    </>
                  )}
                </div>
                
                {/* Content message */}
                <Card.Text 
                  className="mb-2"
                  style={{ 
                    color: isOwnMessage && !isAI ? 'white' : '#1f2937',
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}
                >
                  {message.content}
                </Card.Text>
                
                {/* Timestamp dan Delete button */}
                <div className="d-flex justify-content-between align-items-center">
                  <small style={{ 
                    color: isOwnMessage && !isAI ? 'rgba(255,255,255,0.8)' : '#6b7280',
                    fontSize: '0.75rem'
                  }}>
                    {new Date(message.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </small>
                  
                  {isOwnMessage && !isAI && onDelete && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0"
                      style={{ color: isOwnMessage ? 'white' : '#ef4444' }}
                      onClick={() => onDelete(message.id)}
                      title="Delete message"
                    >
                      <Trash size={14} />
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
