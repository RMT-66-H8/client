import { FaTrash, FaLock, FaGlobe } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './MessageBubble.css';

const MessageBubble = ({ message, isOwnMessage, onDelete, canDelete }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isAI = message.User?.isAI || false;
  const isPrivate = message.receiverId !== null && message.receiverId !== undefined;
  const isBroadcast = !isPrivate;

  return (
    <div className={`message-wrapper ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className={`message-bubble ${isOwnMessage ? 'own' : isAI ? 'ai' : 'other'}`}>
        {!isOwnMessage && (
          <div className="message-sender" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{isAI ? '🤖 AI Assistant' : message.User?.name || 'User'}</span>
            {!isAI && (
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {isBroadcast ? (
                  <FaGlobe title="Broadcast message (visible to all)" />
                ) : (
                  <FaLock title="Private message" />
                )}
              </span>
            )}
          </div>
        )}
        <div className="message-content">
          {isAI ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom styling untuk markdown elements
                p: ({node, ...props}) => <p style={{ margin: '0.5em 0' }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginLeft: '1.2em', marginTop: '0.5em' }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ marginLeft: '1.2em', marginTop: '0.5em' }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: '0.3em' }} {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? (
                    <code style={{ 
                      background: 'rgba(0,0,0,0.1)', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontSize: '0.9em'
                    }} {...props} />
                  ) : (
                    <code style={{ 
                      display: 'block',
                      background: 'rgba(0,0,0,0.1)', 
                      padding: '10px', 
                      borderRadius: '6px',
                      overflowX: 'auto',
                      marginTop: '0.5em'
                    }} {...props} />
                  ),
                pre: ({node, ...props}) => <pre style={{ margin: '0.5em 0' }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ fontWeight: '700' }} {...props} />,
                em: ({node, ...props}) => <em style={{ fontStyle: 'italic' }} {...props} />,
                blockquote: ({node, ...props}) => <blockquote style={{ 
                  borderLeft: '3px solid #10b981', 
                  paddingLeft: '1em',
                  marginLeft: '0',
                  fontStyle: 'italic',
                  color: '#6b7280'
                }} {...props} />,
                h1: ({node, ...props}) => <h1 style={{ fontSize: '1.5em', marginTop: '0.5em', marginBottom: '0.3em' }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: '1.3em', marginTop: '0.5em', marginBottom: '0.3em' }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: '1.1em', marginTop: '0.5em', marginBottom: '0.3em' }} {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            message.content
          )}
        </div>
        <div className="message-footer">
          <span className="message-time">{formatTime(message.createdAt)}</span>
          {canDelete && onDelete && (
            <button 
              className="delete-button" 
              onClick={() => onDelete(message.id)}
              title="Delete message"
            >
              <FaTrash size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
