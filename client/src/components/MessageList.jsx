import React from 'react';
import { Spinner, Badge, Button, Card } from 'react-bootstrap';
import { Trash, Robot, PersonCircle, Lock, Globe } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
        const isOwnMessage = user && message.senderId === user.id;
        const isPrivate = message.receiverId !== null && message.receiverId !== undefined;
        const isBroadcast = !isPrivate;
        
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
                border: 'none',
                position: 'relative'
              }}
            >
              {/* Private/Broadcast Indicator */}
              {!isAI && (
                <div 
                  style={{ 
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    opacity: 0.6,
                    fontSize: '0.75rem'
                  }}
                  title={isBroadcast ? 'Broadcast message (visible to all)' : 'Private message'}
                >
                  {isBroadcast ? (
                    <Globe size={14} style={{ color: isOwnMessage ? 'white' : '#6b7280' }} />
                  ) : (
                    <Lock size={14} style={{ color: isOwnMessage ? 'white' : '#6b7280' }} />
                  )}
                </div>
              )}
              
              <Card.Body className="p-3">
                {/* Badge AI atau User */}
                <div className="d-flex align-items-center mb-2">
                  {isAI ? (
                    <>
                      <Robot size={18} className="me-2" style={{ color: '#10b981' }} />
                      <Badge bg="success" style={{ background: '#10b981' }}>
                        🤖 AI Support
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
                <div 
                  className="mb-2"
                  style={{ 
                    color: isOwnMessage && !isAI ? 'white' : '#1f2937',
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}
                >
                  {isAI ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        // Custom styling untuk markdown elements
                        p: ({node, ...props}) => <p style={{ margin: '0.5em 0' }} {...props} />,
                        ul: ({node, ...props}) => <ul style={{ marginLeft: '1.2em', marginTop: '0.5em', marginBottom: '0.5em' }} {...props} />,
                        ol: ({node, ...props}) => <ol style={{ marginLeft: '1.2em', marginTop: '0.5em', marginBottom: '0.5em' }} {...props} />,
                        li: ({node, ...props}) => <li style={{ marginBottom: '0.3em' }} {...props} />,
                        code: ({node, inline, ...props}) => 
                          inline ? (
                            <code style={{ 
                              background: 'rgba(16, 185, 129, 0.15)', 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              fontSize: '0.9em',
                              fontFamily: 'monospace'
                            }} {...props} />
                          ) : (
                            <code style={{ 
                              display: 'block',
                              background: 'rgba(16, 185, 129, 0.15)', 
                              padding: '10px', 
                              borderRadius: '6px',
                              overflowX: 'auto',
                              marginTop: '0.5em',
                              marginBottom: '0.5em',
                              fontFamily: 'monospace'
                            }} {...props} />
                          ),
                        pre: ({node, ...props}) => <pre style={{ margin: '0.5em 0' }} {...props} />,
                        strong: ({node, ...props}) => <strong style={{ fontWeight: '700', color: '#059669' }} {...props} />,
                        em: ({node, ...props}) => <em style={{ fontStyle: 'italic' }} {...props} />,
                        blockquote: ({node, ...props}) => <blockquote style={{ 
                          borderLeft: '3px solid #10b981', 
                          paddingLeft: '1em',
                          marginLeft: '0',
                          fontStyle: 'italic',
                          color: '#6b7280',
                          marginTop: '0.5em',
                          marginBottom: '0.5em'
                        }} {...props} />,
                        h1: ({node, ...props}) => <h1 style={{ fontSize: '1.5em', marginTop: '0.5em', marginBottom: '0.3em', color: '#059669' }} {...props} />,
                        h2: ({node, ...props}) => <h2 style={{ fontSize: '1.3em', marginTop: '0.5em', marginBottom: '0.3em', color: '#059669' }} {...props} />,
                        h3: ({node, ...props}) => <h3 style={{ fontSize: '1.1em', marginTop: '0.5em', marginBottom: '0.3em', color: '#10b981' }} {...props} />,
                        a: ({node, ...props}) => <a style={{ color: '#10b981', textDecoration: 'underline' }} {...props} />,
                        hr: ({node, ...props}) => <hr style={{ border: '1px solid #10b981', margin: '1em 0' }} {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <span>{message.content}</span>
                  )}
                </div>
                
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
