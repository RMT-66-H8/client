import { Navbar, Nav, Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { Search, Cart, PlusSquare } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, InputGroup, Dropdown } from 'react-bootstrap'
import { Search, Cart, PersonCircle, ChatDots } from "react-bootstrap-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function NavbarPage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
                <Container fluid className="px-4">
                    <Navbar.Brand className="d-flex align-items-center">
                        <Link to='/' className="d-flex align-items-center text-decoration-none">
                            <div style={{
                            width: 36,
                            height: 36,
                            backgroundColor: '#00a64f',
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 4
                        }}>
                            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>T</span>
                        </div>
                            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0a0a0a' }}>ukupedia</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#kategori">Kategori</Nav.Link>
                        </Nav>
                        <Form className="d-flex flex-grow-1 mx-lg-5">
                            <InputGroup>
                                <FormControl
                                    type="search"
                                    placeholder="Cari di Tukupedia"
                                    className="search-input"
                                    aria-label="Search"
                                />
                                <Button variant="outline-secondary" className="search-button">
                                    <Search color="#6c757d" />
                                </Button>
                            </InputGroup>
                        </Form>
                        <Nav className="align-items-center">
                            <Button variant="light" className="me-2">
                                <Cart size={24} />
                            </Button>
                            
                            {user ? (
                                <>
                                    <Button 
                                        variant="light" 
                                        className="me-2"
                                        onClick={() => navigate('/chat')}
                                        title="Messages"
                                    >
                                        <ChatDots size={24} />
                                    </Button>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="light" id="dropdown-user">
                                            <PersonCircle size={24} className="me-2" />
                                            {user.name || user.email}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => navigate('/chat')}>
                                                <ChatDots className="me-2" />
                                                Messages
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={handleLogout}>
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Button variant="light" className="me-3">
                                        <PersonCircle size={24} />
                                    </Button>
                                    <div className="vr d-none d-lg-block" />
                                    <Button variant="outline-success" className="ms-lg-3 me-2" href="/login">
                                        Masuk
                                    </Button>
                                    <Button variant="success" href="/register">Daftar</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}