import React, { useState } from 'react';
import { Modal, Form, Button, Badge, Spinner } from 'react-bootstrap';
import { Robot } from 'react-bootstrap-icons';
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
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await http.post('/messages/ai', {
        message: userQuestion,
      });

      Swal.fire({
        icon: 'success',
        title: 'AI Support Response',
        html: `<div style="text-align: left; padding: 10px;">
          <strong>Your Question:</strong>
          <p>${userQuestion}</p>
          <hr>
          <strong>AI Answer:</strong>
          <p>${data.aiMessage?.content || data.response || 'No response'}</p>
        </div>`,
        confirmButtonText: 'Got it!',
        width: 600,
      });

      setQuestion('');
    } catch (err) {
      console.error('Error requesting AI:', err);
      Swal.fire({
        icon: 'error',
        title: 'AI Not Responding',
        text: err.response?.data?.message || 'An error occurred',
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
      <Modal.Header closeButton>
        <Modal.Title>
          <Robot className="me-2" size={28} />
          AI Support
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {quickHelp && quickHelp.length > 0 && (
          <div className="mb-4">
            <h6 className="mb-3">Quick Help Topics:</h6>
            <div className="d-flex flex-wrap gap-2">
              {quickHelp.map((topic, index) => (
                <Badge
                  key={index}
                  bg="light"
                  text="dark"
                  className="border"
                  style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                  onClick={() => !loading && handleQuickHelp(topic.question || topic.title || topic)}
                >
                  {topic.title || topic.question || topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Ask AI Support:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              disabled={loading}
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
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
                'Get AI Help'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
