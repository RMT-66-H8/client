import { useProduct } from "../context/product"
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import NavbarPage from "../components/NavbarPage";
import CardPage from "../components/CardPage";
import { useEffect } from "react";

export default function HomePage() {
    const { products } = useProduct()

    console.log({products});
    

    return (
        <>
            <NavbarPage />
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
                <CardPage products={products} />
                
            </Container>
        </>
    )
}