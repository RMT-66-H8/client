import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import NavbarPage from "../components/NavbarPage";
import { useNavigate } from "react-router";
import { http } from "../helpers/http";

export default function AddProductPage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await http({
                method: 'POST',
                url: '/products',
                data: {
                    name,
                    description,
                    price: Number(price),
                    stock: Number(stock),
                    imageUrl,
                    category
                }
            })

            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavbarPage />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="p-4 shadow-sm">
                            <h3 className="mb-4 text-center">Add New Product</h3>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter price in numbers" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Product category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Product image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>

                                <Button type="submit" variant="success" className="w-100">
                                    Add Product
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}