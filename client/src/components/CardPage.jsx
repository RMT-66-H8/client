import { Row, Col, Card, Button } from 'react-bootstrap'
import { useState } from 'react'
import api, { http } from '../helpers/http'

export default function CardPage({ products = [] }) {
    const list = Array.isArray(products) ? products : (products && products.products) || []
    const [loadingMap, setLoadingMap] = useState({})
    const [addedMap, setAddedMap] = useState({})

    const handleAddToCart = async (productId) => {
        if (loadingMap[productId] || addedMap[productId]) return

        setLoadingMap((s) => ({ ...s, [productId]: true }))
        try {
            const response = await http({
                method: 'POST',
                url: '/cart',
                data: { productId }
            })
            setAddedMap((s) => ({ ...s, [productId]: true }))
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || 'Gagal tambah ke keranjang'
            alert(msg)
        } finally {
            setLoadingMap((s) => ({ ...s, [productId]: false }))
        }
    }

    return (
        <>
            <Row xs={2} md={4} lg={6} className="g-3">
                {list.map((product) => (
                    <Col key={product.id}>
                        <Card className="h-100 product-card">
                            <Card.Img variant="top" src={product.image || product.imageUrl} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="product-title">
                                    {product.name}
                                </Card.Title>
                                <Card.Text className="fw-bold mt-auto">{product.price}</Card.Text>
                                <div className="text-muted small mb-3">
                                    <div>{product.seller}</div>
                                    <span>⭐ {product.rating}</span>
                                </div>

                                <Button
                                    variant={addedMap[product.id] ? 'secondary' : 'success'}
                                    onClick={() => handleAddToCart(product.id)}
                                    disabled={loadingMap[product.id] || addedMap[product.id]}
                                >
                                    {loadingMap[product.id] ? 'Menambahkan...' : (addedMap[product.id] ? 'Ditambahkan' : 'Tambah ke Keranjang')}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}