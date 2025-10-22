import { useState } from "react"
import { http } from "../helpers/http"
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

export default function HomePage() {
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        try {
            const response = await http({
                method: 'GET',
                url: '/oroducts'
            })

            setProducts(response.data)
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 rounded"
                                    src="https://via.placeholder.com/1200x300.png?text=Promo+Spesial+Oktober"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 rounded"
                                    src="https://via.placeholder.com/1200x300.png?text=Diskon+Gila-Gilaan"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 rounded"
                                    src="https://via.placeholder.com/1200x300.png?text=Gratis+Ongkir+Se-Indonesia"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                <h2 className="mt-5 mb-3">Untuk Anda</h2>
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
            </Container>
        </>
    )
}