import { Navbar, Nav, Container, Form, FormControl, Button, InputGroup, Dropdown, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { Search, Cart, PersonCircle, ChatDots } from "react-bootstrap-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { useState, useEffect, useRef } from 'react';

export default function NavbarPage({ onSearch }) {
    const { user } = useSelector((state) => state.auth);
    const { items: cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [badgePulse, setBadgePulse] = useState(false);
    const prevCartLength = useRef(cartItems.length);

    console.log('🔔 Navbar - Cart Items:', cartItems);

    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [user, dispatch]);

    // Add pulse animation when cart items change
    useEffect(() => {
        if (cartItems.length !== prevCartLength.current && cartItems.length > 0) {
            setBadgePulse(true);
            const timer = setTimeout(() => setBadgePulse(false), 600);
            prevCartLength.current = cartItems.length;
            return () => clearTimeout(timer);
        }
    }, [cartItems.length]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="navbar-custom shadow-lg" sticky="top">
                <Container fluid className="px-4">
                    <Navbar.Brand>
                        <Link to='/' className="d-flex align-items-center text-decoration-none navbar-brand">
                            <div style={{
                                width: 40,
                                height: 40,
                                background: 'white',
                                borderRadius: 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}>
                                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.3rem' }}>T</span>
                            </div>
                            <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white' }}>Tukupedia</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'white' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ms-4">
                            <Link to='/' className="nav-link-custom">Home</Link>
                        </Nav>
                        
                        <Form className="d-flex search-navbar mx-lg-4 my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                            <InputGroup>
                                <FormControl
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    style={{
                                        borderRadius: '25px 0 0 25px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.2)',
                                        color: 'white'
                                    }}
                                />
                                <Button 
                                    type="submit"
                                    style={{
                                        borderRadius: '0 25px 25px 0',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.3)',
                                        borderLeft: 'none'
                                    }}
                                >
                                    <Search color="white" />
                                </Button>
                            </InputGroup>
                        </Form>

                        <Nav className="align-items-center">
                            {user ? (
                                <>
                                    <Link to='/cart' className="me-3">
                                        <Button variant="light" className="btn-nav position-relative" style={{ padding: '8px 15px' }}>
                                            <Cart size={20} className="me-2" />
                                            Cart
                                            {cartItems.length > 0 && (
                                                <Badge 
                                                    bg="danger" 
                                                    pill 
                                                    className={`position-absolute top-0 start-100 translate-middle ${badgePulse ? 'badge-pulse' : ''}`}
                                                    style={{ fontSize: '0.7rem' }}
                                                >
                                                    {cartItems.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </Link>

                                    <Link to='/chat' className="me-3">
                                        <Button variant="light" className="btn-nav" style={{ padding: '8px 15px' }}>
                                            <ChatDots size={20} className="me-2" />
                                            Messages
                                        </Button>
                                    </Link>
                                    
                                    <Dropdown align="end">
                                        <Dropdown.Toggle 
                                            variant="light" 
                                            className="btn-nav"
                                            style={{ borderRadius: '25px' }}
                                        >
                                            <PersonCircle size={20} className="me-2" />
                                            {user.name || user.email}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ borderRadius: '15px', marginTop: '10px' }}>
                                            <Dropdown.Item onClick={handleLogout} style={{ color: '#ef4444' }}>
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Button 
                                        variant="outline-light" 
                                        className="btn-nav me-2" 
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Button>
                                    <Button 
                                        className="btn-nav" 
                                        onClick={() => navigate('/register')}
                                        style={{ background: 'white', color: '#10b981', border: '2px solid white' }}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}