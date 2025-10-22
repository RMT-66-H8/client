import { FaTrash } from 'react-icons/fa';
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

  return (
    <div className={`message-wrapper ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className={`message-bubble ${isOwnMessage ? 'own' : isAI ? 'ai' : 'other'}`}>
        {!isOwnMessage && (
          <div className="message-sender">
            {isAI ? 'AI Assistant' : message.User?.name || 'User'}
          </div>
        )}
        <div className="message-content">{message.content}</div>
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
