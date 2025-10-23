import { Card, ListGroup, Badge, Spinner } from 'react-bootstrap';
import { PersonCircle, Circle } from 'react-bootstrap-icons';

export default function UserList({ users, onlineUsers, loading, selectedUser, onSelectUser, currentUserId }) {
  const isUserOnline = (userId) => {
    return onlineUsers.some(u => u.userId === userId);
  };

  const filteredUsers = users.filter(u => u.id !== currentUserId);

  return (
    <Card style={{ borderRadius: '15px', border: '1px solid #e5e7eb', height: '100%' }}>
      <Card.Header 
        style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          borderRadius: '15px 15px 0 0',
          padding: '15px'
        }}
      >
        <h6 className="mb-0">
          <PersonCircle className="me-2" />
          Users ({filteredUsers.length})
        </h6>
        <small style={{ opacity: 0.9 }}>
          <Circle fill="#10b981" className="me-1" style={{ fontSize: '8px' }} />
          {onlineUsers.length} online
        </small>
      </Card.Header>
      <ListGroup variant="flush" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" style={{ color: '#10b981' }} />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <small>No users found</small>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const online = isUserOnline(user.id);
            const isSelected = selectedUser?.id === user.id;
            
            return (
              <ListGroup.Item
                key={user.id}
                action
                active={isSelected}
                onClick={() => onSelectUser(user)}
                style={{
                  cursor: 'pointer',
                  borderLeft: isSelected ? '4px solid #10b981' : 'none',
                  background: isSelected ? '#f0fdf4' : 'transparent',
                  transition: 'all 0.2s'
                }}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <div style={{ position: 'relative', marginRight: '12px' }}>
                    <PersonCircle 
                      size={32} 
                      style={{ 
                        color: isSelected ? '#10b981' : '#6b7280' 
                      }} 
                    />
                    {online && (
                      <Circle
                        fill="#10b981"
                        size={10}
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          border: '2px solid white',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: isSelected ? '600' : '500',
                      color: isSelected ? '#10b981' : '#1f2937',
                      fontSize: '0.95rem'
                    }}>
                      {user.name}
                    </div>
                    <small style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                      {user.email}
                    </small>
                  </div>
                </div>
                {online && (
                  <Badge 
                    bg="success" 
                    style={{ 
                      fontSize: '0.7rem',
                      background: '#10b981'
                    }}
                  >
                    Online
                  </Badge>
                )}
              </ListGroup.Item>
            );
          })
        )}
      </ListGroup>
    </Card>
  );
}
