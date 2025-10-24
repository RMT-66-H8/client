import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetStatus } from "../store/slices/authSlice";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Reset status when component mounts
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Please login to continue',
        confirmButtonColor: '#10b981',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        dispatch(resetStatus()); // Reset status before navigating
        navigate('/login');
      });
    }
  }, [status, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ name, username, email, password }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-4">
          <div style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '2.5rem' }}>T</span>
          </div>
          <h2>Join Tukupedia!</h2>
          <p className="text-muted">Create your account to get started</p>
        </div>

        {error && <Alert variant="danger" style={{ borderRadius: '12px' }}>{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Full Name</Form.Label>
            <Form.Control
              type="text"
              className="form-control-custom"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control-custom"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-custom">Email Address</Form.Label>
            <Form.Control

              className="form-control-custom"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="form-label-custom">Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control-custom"
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              minLength={6}
            />
          </Form.Group>

          <Button
            type="submit"
            className="btn-primary-custom w-100 mb-3"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an account?{" "}
            <Link to="/login" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
              Login here
            </Link>
          </p>
          <Link to="/" style={{ color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}