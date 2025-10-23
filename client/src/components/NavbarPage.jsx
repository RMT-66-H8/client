import { Navbar, Nav, Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { Search, Cart, PlusSquare } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

export default function NavbarPage() {

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
                            <Link to='/cart'>
                                <Button variant="light" className="me-2">
                                    <Cart size={24} />
                                </Button>
                            </Link>
                            <Link to='/add-product'>
                                <Button variant="light" className="me-3" title="Tambah Produk">
                                    <PlusSquare size={24} />
                                </Button>
                            </Link>
                            <div className="vr d-none d-lg-block" />
                            <Button variant="outline-success" className="ms-lg-3 me-2" href="/login">
                                Masuk
                            </Button>
                            <Button variant="success" href="/register">Daftar</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}