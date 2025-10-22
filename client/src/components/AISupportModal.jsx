import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpClient } from '../helpers/http';

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
      const { data } = await httpClient.post('/messages/ai', {
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

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>AI Support</h2>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}>×</button>
        </div>

        {quickHelp && quickHelp.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>Quick Help Topics:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quickHelp.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickHelp(topic.question || topic.title || topic)}
                  disabled={loading}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid',
                    borderRadius: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    background: 'white'
                  }}
                >
                  {topic.title || topic.question || topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
              Ask AI Support:
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              disabled={loading}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '10px 20px',
                border: '1px solid',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: 'white'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !question.trim()}
              style={{
                padding: '10px 20px',
                border: '1px solid',
                borderRadius: '8px',
                cursor: (loading || !question.trim()) ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Getting Answer...' : 'Get AI Help'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
