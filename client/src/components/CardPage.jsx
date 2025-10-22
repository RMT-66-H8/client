import { Row, Col, Card } from 'react-bootstrap'

export default function CardPage({ products = [] }) {

    return (
        <>
            <Row xs={2} md={4} lg={6} className="g-3">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card className="h-100 product-card">
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="product-title">
                                    {product.name}
                                </Card.Title>
                                <Card.Text className="fw-bold mt-auto">{product.price}</Card.Text>
                                <div className="text-muted small">
                                    <div>{product.seller}</div>
                                    <span>⭐ {product.rating}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}