import React, { useState } from 'react';
import { Modal, Form, Button, Badge, Spinner } from 'react-bootstrap';
import { Robot, Send, Lightbulb } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { http } from '../helpers/http';

export default function AISupportModal({ isOpen, onClose, quickHelp }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickHelp = async (topic) => {
    setQuestion(topic);
    await getAIHelp(topic);
  };

  const getAIHelp = async (userQuestion) => {
    if (!userQuestion.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Question',
        text: 'Please enter your question',
        confirmButtonColor: '#10b981'
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await http.post('/messages/ai', {
        content: userQuestion,
        userId: null // AI support doesn't require auth
      });

      console.log('AI Response:', data); // Debug log

      // Extract AI response from various possible structures
      const aiResponse = data.aiMessage?.content 
        || data.response 
        || data.message?.content
        || data.content
        || JSON.stringify(data);

      // Show clean result modal
      Swal.fire({
        icon: 'success',
        title: '<div style="color: #10b981; font-size: 1.5rem; font-weight: bold;">🤖 AI Support</div>',
        html: `
          <div style="text-align: left; padding: 20px 10px;">
            <!-- Question Section -->
            <div style="
              background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
              padding: 20px;
              border-radius: 15px;
              border-left: 4px solid #10b981;
              margin-bottom: 20px;
              box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1);
            ">
              <div style="
                color: #059669;
                font-weight: 600;
                font-size: 0.95rem;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">
                📝 Your Question
              </div>
              <div style="
                color: #374151;
                font-size: 1rem;
                line-height: 1.6;
              ">
                ${userQuestion}
              </div>
            </div>

            <!-- Answer Section -->
            <div style="
              background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
              padding: 20px;
              border-radius: 15px;
              border-left: 4px solid #10b981;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            ">
              <div style="
                color: #10b981;
                font-weight: 600;
                font-size: 0.95rem;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">
                💡 AI Answer
              </div>
              <div style="
                color: #1f2937;
                font-size: 1.05rem;
                line-height: 1.8;
              ">
                ${aiResponse}
              </div>
            </div>
          </div>
        `,
        confirmButtonText: '<span style="font-size: 1rem;">✓ Got it!</span>',
        confirmButtonColor: '#10b981',
        buttonsStyling: true,
        customClass: {
          popup: 'swal-ai-popup',
          confirmButton: 'swal-ai-button'
        },
        width: 700,
        padding: '2rem',
        backdrop: `
          rgba(16, 185, 129, 0.1)
          left top
          no-repeat
        `
      });

      setQuestion('');
    } catch (err) {
      console.error('Error requesting AI:', err);
      Swal.fire({
        icon: 'error',
        title: 'AI Not Responding',
        text: err.response?.data?.message || 'An error occurred',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAIHelp(question);
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className="border-0" style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white'
      }}>
        <Modal.Title>
          <Robot className="me-2" size={28} />
          AI Support Assistant
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ padding: '30px' }}>
        {quickHelp && quickHelp.length > 0 && (
          <div className="mb-4" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
            padding: '20px',
            borderRadius: '15px',
            border: '2px solid rgba(16, 185, 129, 0.2)'
          }}>
            <h6 className="mb-3 d-flex align-items-center" style={{ color: '#10b981', fontWeight: 'bold' }}>
              <Lightbulb className="me-2" />
              Quick Help Topics:
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {quickHelp.map((topic, index) => (
                <Badge
                  key={index}
                  bg="success"
                  style={{ 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    padding: '10px 15px',
                    fontSize: '0.9rem',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    transition: 'all 0.3s',
                    transform: loading ? 'none' : 'scale(1)',
                  }}
                  className="hover-badge"
                  onClick={() => !loading && handleQuickHelp(topic.question || topic.title || topic)}
                  onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  {topic.title || topic.question || topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">
              Ask AI Support Anything:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here... (e.g., How do I track my order?)"
              disabled={loading}
              className="form-control-custom"
              style={{
                resize: 'none',
                fontSize: '1rem'
              }}
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              style={{ borderRadius: '25px', padding: '10px 25px' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary-custom"
              disabled={loading || !question.trim()}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Getting Answer...
                </>
              ) : (
                <>
                  <Send className="me-2" size={18} />
                  Get AI Help
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
