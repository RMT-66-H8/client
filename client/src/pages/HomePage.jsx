import { useState } from "react"
import { http } from "../helpers/http"
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import NavbarPage from "../components/NavbarPage";
import CardPage from "../components/CardPage";
import { useEffect } from "react";

export default function HomePage() {
    const [products, setProducts] = useState([])

    // const fetchData = async () => {
    //     try {
    //         const response = await http({
    //             method: 'GET',
    //             url: '/oroducts'
    //         })

    //         setProducts(response.data)
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    // data dummy untuk sementara
    useEffect(() => {
        const dummyProducts = [
            {
                id: 1,
                name: "Smartphone Flagship Terbaru 2025",
                price: "Rp 15.000.000",
                image: "https://via.placeholder.com/200x200.png?text=Smartphone",
                seller: "Gadget Store",
                rating: "4.9 | Terjual 1rb+",
            },
            {
                id: 2,
                name: "Laptop Gaming Pro Generasi ke-10",
                price: "Rp 25.000.000",
                image: "https://via.placeholder.com/200x200.png?text=Laptop",
                seller: "PC Master",
                rating: "4.8 | Terjual 500+",
            },
            {
                id: 3,
                name: "Kemeja Pria Lengan Panjang Katun",
                price: "Rp 250.000",
                image: "https://via.placeholder.com/200x200.png?text=Kemeja",
                seller: "Fashion Pria",
                rating: "4.9 | Terjual 2rb+",
            },
            {
                id: 4,
                name: "Sepatu Lari Wanita Ringan dan Nyaman",
                price: "Rp 750.000",
                image: "https://via.placeholder.com/200x200.png?text=Sepatu",
                seller: "Sporty Girl",
                rating: "4.7 | Terjual 1.5rb+",
            },
            {
                id: 5,
                name: "Buku Fiksi Best Seller Internasional",
                price: "Rp 120.000",
                image: "https://via.placeholder.com/200x200.png?text=Buku",
                seller: "Bookworm Corner",
                rating: "5.0 | Terjual 5rb+",
            },
            {
                id: 6,
                name: "Headphone Wireless Noise Cancelling",
                price: "Rp 1.200.000",
                image: "https://via.placeholder.com/200x200.png?text=Headphone",
                seller: "Audio Mania",
                rating: "4.8 | Terjual 900+",
            },
        ];
        setProducts(dummyProducts);
    }, []);

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