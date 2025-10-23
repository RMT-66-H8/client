import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import NavbarPage from "../components/NavbarPage";
import { useNavigate } from "react-router";

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
                            <h3 className="mb-4 text-center">Tambah Produk Baru</h3>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Produk</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan nama produk" value={name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Harga</Form.Label>
                                    <Form.Control type="number" placeholder="Masukkan harga dalam angka" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Stok</Form.Label>
                                    <Form.Control type="number" placeholder="Stok" value={stock} onChange={(e) => setStock(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kategori</Form.Label>
                                    <Form.Control type="text" placeholder="Kategori produk" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>URL Gambar</Form.Label>
                                    <Form.Control type="text" placeholder="URL gambar produk" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Deskripsi produk" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>

                                <Button type="submit" variant="success" className="w-100">
                                    Tambah Produk
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}