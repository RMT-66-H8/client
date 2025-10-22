import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';

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
    <div className="p-3 border-top">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your message..."
            disabled={disabled}
            aria-label="Message input"
          />
          
          <Button
            type="submit"
            variant="success"
            disabled={disabled || !value.trim()}
          >
            <Send className="me-2" />
            Send
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
