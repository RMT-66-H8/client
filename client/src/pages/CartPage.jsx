import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Image, Form, Spinner, Alert } from "react-bootstrap";
import NavbarPage from "../components/NavbarPage";
import api, { http } from "../helpers/http";

export default function CartPage() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCart = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await http({
                method: 'GET',
                url: '/cart',
            })

            setItems(response.data.cart || [])
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Gagal ambil keranjang')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleRemove = async (cartId) => {
        if (!confirm('Hapus item ini dari keranjang?')) return
        setActionLoading(true)
        try {
            const response = await http({
                method: 'DELETE',
                url: `/cart/${cartId}`,
            })
        } catch (err) {
            alert(err?.response?.data?.message || 'Gagal hapus item')
        } finally {
            setActionLoading(false)
        }
    }

    const subtotal = items.reduce((s, it) => {
        const price = it?.Product?.price ?? 0
        const qty = Number(it.quantity ?? 1)
        return s + price * qty
    }, 0)

    return (
        <>
            <NavbarPage />
            <Container className="mt-4">
                <h3 className="mb-4">Keranjang Belanja</h3>

                {loading ? (
                    <div className="text-center py-5"><Spinner animation="border" /></div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Row>
                        <Col md={8}>
                            <Card className="p-3">
                                <h5>Items</h5>
                                {items.length === 0 ? (
                                    <div className="text-muted">Keranjang kosong. Tambahkan produk terlebih dahulu.</div>
                                ) : (
                                    <ListGroup variant="flush">
                                        {items.map(item => {
                                            const product = item.Product || {}
                                            const qty = item.quantity ?? 1
                                            return (
                                                <ListGroup.Item key={item.id} className="d-flex align-items-center">
                                                    <Image src={product.imageUrl} rounded style={{ width: 80, height: 80, objectFit: 'cover' }} />
                                                    <div className="ms-3 flex-grow-1">
                                                        <div className="fw-bold">{product.name}</div>
                                                        <div className="text-muted">Rp {Number(product.price || 0).toLocaleString()}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Control
                                                            type="number"
                                                            min={1}
                                                            value={qty}
                                                            onChange={(e) => updateQtyLocal(item.id, Number(e.target.value))}
                                                            style={{ width: 80 }}
                                                        />
                                                        <Button variant="link" className="text-danger ms-2" onClick={() => handleRemove(item.id)} disabled={actionLoading}>Hapus</Button>
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        })}
                                    </ListGroup>
                                )}
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="p-3">
                                <h5>Ringkasan Pesanan</h5>
                                <div className="d-flex justify-content-between mt-3">
                                    <div>Subtotal</div>
                                    <div>Rp {subtotal.toLocaleString()}</div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div>Ongkir</div>
                                    <div>Rp 0</div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold">
                                    <div>Total</div>
                                    <div>Rp {subtotal.toLocaleString()}</div>
                                </div>

                                <Button variant="success" className="w-100 mt-3" disabled={items.length === 0}>Checkout</Button>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    )
}