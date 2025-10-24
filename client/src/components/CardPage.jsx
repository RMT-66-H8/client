import { Row, Col, Card, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, fetchCart } from '../store/slices/cartSlice'
import Swal from 'sweetalert2'

export default function CardPage({ products = [] }) {
    const [loadingMap, setLoadingMap] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { items: cartItems } = useSelector((state) => state.cart)

    const handleAddToCart = async (productId, productName) => {
        // Check if user is logged in
        if (!isAuthenticated) {
            const result = await Swal.fire({
                title: 'Login Required',
                text: 'You need to login first to add items to cart',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#10b981',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Go to Login',
                cancelButtonText: 'Cancel'
            })

            if (result.isConfirmed) {
                navigate('/login')
            }
            return
        }

        setLoadingMap((s) => ({ ...s, [productId]: true }))
        try {
            // Add to cart via Redux
            await dispatch(addToCart(productId)).unwrap()

            // Refresh cart to get updated data
            const result = await dispatch(fetchCart()).unwrap()

            await Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                html: `
                    <div style="text-align: center;">
                        <p style="font-size: 1.1rem; color: #374151; margin-bottom: 15px;">
                            <strong>${productName}</strong> has been added to your cart
                        </p>
                        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 15px; border-radius: 12px; margin-top: 15px;">
                            <p style="margin: 0; color: #059669; font-weight: 600;">
                                🛒 Total items in cart: ${result.length}
                            </p>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Continue Shopping',
                confirmButtonColor: '#10b981',
                showCancelButton: true,
                cancelButtonText: 'View Cart',
                cancelButtonColor: '#059669',
                timer: 3000,
                timerProgressBar: true
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/cart')
                }
            })
            
        } catch (err) {
            const msg = err || 'Failed to add to cart'
            
            // Check if error is "already in cart"
            if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('sudah')) {
                const result = await Swal.fire({
                    title: 'Product Already in Cart',
                    text: `${productName} is already in your cart. Would you like to view your cart?`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#10b981',
                    cancelButtonColor: '#6b7280',
                    confirmButtonText: 'View Cart',
                    cancelButtonText: 'Continue Shopping'
                })
                
                if (result.isConfirmed) {
                    navigate('/cart')
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: msg,
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                })
            }
        } finally {
            setLoadingMap((s) => ({ ...s, [productId]: false }))
        }
    }

    return (
        <>
            <Row xs={2} md={4} lg={6} className="g-3">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card className="h-100 product-card">
                            <Card.Img 
                                variant="top" 
                                src={product.imageUrl || 'https://via.placeholder.com/150'} 
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="product-title" style={{ fontSize: '0.9rem', minHeight: '40px' }}>
                                    {product.name}
                                </Card.Title>
                                <Card.Text className="fw-bold mt-auto">
                                    Rp {Number(product.price || 0).toLocaleString('id-ID')}
                                </Card.Text>
                                <div className="text-muted small mb-3">
                                    <div>{product.category || 'Uncategorized'}</div>
                                    <div className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                                        Stock: {product.stock || 0}
                                        {product.stock === 0 && ' - Out of Stock'}
                                    </div>
                                </div>

                                <Button
                                    className="btn-primary-custom"
                                    onClick={() => handleAddToCart(product.id, product.name)}
                                    disabled={loadingMap[product.id] || product.stock === 0}
                                    size="sm"
                                    style={{ borderRadius: '8px' }}
                                >
                                    {loadingMap[product.id] ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Adding...
                                        </>
                                    ) : product.stock === 0 ? (
                                        'Out of Stock'
                                    ) : (
                                        '🛒 Add to Cart'
                                    )}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}