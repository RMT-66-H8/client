import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetStatus } from "../store/slices/authSlice";
import { Form, Button, Alert } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log('🔐 Login Page State:', { user, status, error });

  // Reset status when component mounts (only once)
  useEffect(() => {
    dispatch(resetStatus());
  }, []); // Empty dependency array - only run once on mount

  // Show success message when login succeeds
  useEffect(() => {
    if (status === 'succeeded' && user) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${user.name || user.username || user.email}!`,
        confirmButtonColor: '#10b981',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }, [status, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📝 Login attempt with:', { email });
    dispatch(login({ email, password }));
  };

  // If already logged in, redirect to home (AFTER all hooks)
  if (user) {
    return <Navigate to="/" replace />;
  }

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
          <h2>Welcome Back!</h2>
          <p className="text-muted">Login to continue shopping</p>
        </div>

        {error && <Alert variant="danger" style={{ borderRadius: '12px' }}>{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="text-muted">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
              Register here
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