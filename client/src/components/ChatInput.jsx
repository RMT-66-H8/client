import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Send, EmojiSmile } from 'react-bootstrap-icons';

export default function ChatInput({ 
  value, 
  onChange, 
  onSendMessage,
  disabled,
  placeholder = "Type your message... (Press Enter to send)"
}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendMessage && value.trim()) {
      onSendMessage();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <div className="p-3 border-top" style={{ background: '#f9fafb' }}>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            aria-label="Message input"
            className="form-control-custom"
            style={{
              resize: 'none',
              borderRadius: '25px 0 0 25px',
              padding: '12px 20px',
              fontSize: '1rem'
            }}
          />
          
          <Button
            type="submit"
            className="btn-primary-custom"
            disabled={disabled || !value.trim()}
            style={{
              borderRadius: '0 25px 25px 0',
              paddingLeft: '25px',
              paddingRight: '25px'
            }}
          >
            <Send size={18} className="me-2" />
            Send
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
