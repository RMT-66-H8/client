import { useProduct } from "../context/product"
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import NavbarPage from "../components/NavbarPage";
import CardPage from "../components/CardPage";
import AISupportModal from "../components/AISupportModal";
import { useState, useEffect } from "react";
import { Robot } from "react-bootstrap-icons";

export default function HomePage() {
    const { products } = useProduct()
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [showAIModal, setShowAIModal] = useState(false)

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredProducts(filtered)
        }
    }, [searchTerm, products])

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
            <NavbarPage onSearch={handleSearch} />
            
            {/* Floating AI Support Button */}
            <Button
                className="btn-primary-custom"
                onClick={() => setShowAIModal(true)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 1000,
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    padding: '0',
                    boxShadow: '0 5px 20px rgba(16, 185, 129, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title="Need Help? Ask AI Support"
            >
                <Robot size={28} />
            </Button>

            <Container className="mt-4 mb-5">
                {/* Carousel Banner */}
                <Row className="mb-4">
                    <Col>
                        <Carousel interval={3000} pause="hover">
                            <Carousel.Item>
                                <div style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    height: '300px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    🎉 Special October Promo
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div style={{
                                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                    height: '300px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    💰 Crazy Discounts Up to 70%
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div style={{
                                    background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                                    height: '300px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    🚚 Free Shipping Nationwide
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                {/* Products Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary-custom mb-0" style={{ fontWeight: 'bold' }}>
                        {searchTerm ? `Search Results (${filteredProducts.length})` : 'Products For You'}
                    </h2>
                    {searchTerm && (
                        <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setSearchTerm('')}
                            style={{ borderRadius: '20px' }}
                        >
                            Clear Search ✕
                        </button>
                    )}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-5">
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                        <h4 className="text-muted">No products found</h4>
                        <p className="text-secondary">Try different search terms or browse all products</p>
                        {searchTerm && (
                            <button 
                                className="btn btn-primary-custom mt-3"
                                onClick={() => setSearchTerm('')}
                            >
                                Show All Products
                            </button>
                        )}
                    </div>
                ) : (
                    <CardPage products={filteredProducts} />
                )}
                
            </Container>

            {/* AI Support Modal */}
            <AISupportModal 
                isOpen={showAIModal}
                onClose={() => setShowAIModal(false)}
                quickHelp={[]}
            />
        </>
    )
}