import { useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Image, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, removeFromCart, clearCart } from "../store/slices/cartSlice";
import NavbarPage from "../components/NavbarPage";
import Swal from 'sweetalert2';

export default function CartPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartState = useSelector((state) => state.cart)
    const { items, status, error } = cartState
    const loading = status === 'loading'

    console.log('🛒 Full Cart State:', cartState);
    console.log('🛒 Cart Items:', items);
    console.log('🛒 Items Type:', typeof items, Array.isArray(items));
    console.log('🛒 Status:', status);
    console.log('🛒 Error:', error);

    useEffect(() => {
        console.log('🔄 Fetching cart...');
        dispatch(fetchCart())
    }, [dispatch])

    const handleRemove = async (cartId, productName) => {
        const result = await Swal.fire({
            title: 'Remove Item?',
            text: `Remove "${productName}" from your cart?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Remove',
            cancelButtonText: 'Cancel'
        })

        if (!result.isConfirmed) return

        try {
            await dispatch(removeFromCart(cartId)).unwrap()
            await Swal.fire({
                icon: 'success',
                title: 'Removed!',
                text: 'Item removed from cart',
                timer: 1500,
                showConfirmButton: false
            })
            // Refresh cart after removal
            dispatch(fetchCart())
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err || 'Failed to remove item',
                confirmButtonColor: '#ef4444'
            })
        }
    }

    // Calculate subtotal (each item has quantity 1)
    const subtotal = items.reduce((s, it) => {
        const price = it?.Product?.price ?? 0
        return s + price
    }, 0)

    const handleCheckout = async () => {
        if (items.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cart is Empty',
                text: 'Please add items to your cart before checkout',
                confirmButtonColor: '#10b981'
            })
            return
        }

        const result = await Swal.fire({
            title: 'Confirm Checkout',
            html: `
                <div style="text-align: left;">
                    <h5 style="color: #1f2937; margin-bottom: 15px;">Order Summary:</h5>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #6b7280;">Items:</span>
                            <span style="font-weight: 600;">${items.length} ${items.length === 1 ? 'item' : 'items'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #6b7280;">Subtotal:</span>
                            <span style="font-weight: 600;">Rp ${subtotal.toLocaleString('id-ID')}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #6b7280;">Shipping:</span>
                            <span style="color: #10b981; font-weight: 600;">FREE</span>
                        </div>
                        <hr style="margin: 10px 0; border-color: #e5e7eb;">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="font-size: 1.1rem; font-weight: 700;">Total:</span>
                            <span style="font-size: 1.1rem; font-weight: 700; color: #10b981;">Rp ${subtotal.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <p style="color: #6b7280; font-size: 0.9rem; margin-top: 15px;">
                        📦 Your order will be processed after confirmation
                    </p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: '✅ Confirm Order',
            cancelButtonText: 'Cancel',
            width: '500px'
        })

        if (!result.isConfirmed) return

        // Show processing
        Swal.fire({
            title: 'Processing Order...',
            html: 'Please wait while we process your order',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        // Simulate order processing (replace with actual API call)
        setTimeout(async () => {
            // Clear cart immediately after successful checkout
            dispatch(clearCart());
            
            await Swal.fire({
                icon: 'success',
                title: 'Order Placed Successfully! 🎉',
                html: `
                    <div style="text-align: center;">
                        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">
                            <div style="font-size: 3rem; margin-bottom: 10px;">✅</div>
                            <h4 style="color: #059669; margin-bottom: 10px;">Thank You for Your Order!</h4>
                            <p style="color: #6b7280; margin-bottom: 15px;">
                                Order Number: <strong>#${Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
                            </p>
                            <div style="background: white; padding: 15px; border-radius: 10px; margin-top: 15px;">
                                <p style="color: #1f2937; margin: 5px 0;">
                                    <strong>Total Items:</strong> ${items.length}
                                </p>
                                <p style="color: #1f2937; margin: 5px 0;">
                                    <strong>Total Amount:</strong> Rp ${subtotal.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                        <p style="color: #6b7280; font-size: 0.9rem;">
                            📧 A confirmation email has been sent to your email address
                        </p>
                    </div>
                `,
                confirmButtonText: 'Continue Shopping',
                confirmButtonColor: '#10b981',
                allowOutsideClick: false,
                timer: 5000,
                timerProgressBar: true
            })

            // Redirect to homepage with fresh cart data
            dispatch(fetchCart());
            navigate('/')
        }, 2000)
    }

    return (
        <>
            <NavbarPage />
            <Container className="mt-4 mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-primary-custom" style={{ fontWeight: 'bold' }}>
                        🛒 Shopping Cart
                    </h3>
                    {items.length > 0 && (
                        <div style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            fontWeight: '600'
                        }}>
                            {items.length} {items.length === 1 ? 'item' : 'items'}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" style={{ color: '#10b981' }} />
                        <p className="mt-3 text-muted">Loading your cart...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">
                        <Alert.Heading>Error Loading Cart</Alert.Heading>
                        <p>{error}</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => dispatch(fetchCart())} variant="outline-danger">
                                Try Again
                            </Button>
                        </div>
                    </Alert>
                ) : !items || items.length === 0 ? (
                    <div className="text-center py-5">
                        <Card className="p-5 shadow-sm" style={{ borderRadius: '15px' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🛒</div>
                            <h5 style={{ color: '#6b7280' }}>Your cart is empty</h5>
                            <p className="text-muted">Add products to get started!</p>
                            <Button 
                                className="btn-primary-custom mt-3" 
                                onClick={() => navigate('/')}
                                style={{ padding: '10px 30px', borderRadius: '10px' }}
                            >
                                Start Shopping
                            </Button>
                        </Card>
                    </div>
                ) : (
                    <Row>
                        <Col md={8}>
                            <Card className="p-4 shadow-sm" style={{ borderRadius: '15px' }}>
                                <h5 className="mb-3">Cart Items</h5>
                                {items.length === 0 ? (
                                    <div className="text-center py-5">
                                        <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🛒</div>
                                        <h5 style={{ color: '#6b7280' }}>Your cart is empty</h5>
                                        <p className="text-muted">Add products to get started!</p>
                                    </div>
                                ) : (
                                    <ListGroup variant="flush">
                                        {items.map(item => {
                                            const product = item.Product || {}
                                            return (
                                                <ListGroup.Item key={item.id} className="d-flex align-items-center py-3 border-bottom">
                                                    <Image 
                                                        src={product.imageUrl || 'https://via.placeholder.com/150'} 
                                                        rounded 
                                                        style={{ 
                                                            width: 100, 
                                                            height: 100, 
                                                            objectFit: 'cover',
                                                            border: '2px solid #e5e7eb'
                                                        }} 
                                                    />
                                                    <div className="ms-3 flex-grow-1">
                                                        <div className="fw-bold" style={{ fontSize: '1.1rem', color: '#1f2937' }}>
                                                            {product.name}
                                                        </div>
                                                        <div className="text-primary-custom fw-bold mt-1" style={{ fontSize: '1.05rem' }}>
                                                            Rp {Number(product.price || 0).toLocaleString('id-ID')}
                                                        </div>
                                                        <div className="text-muted small mt-1">
                                                            Stock: {product.stock || 0}
                                                        </div>
                                                        {product.description && (
                                                            <div className="text-muted small mt-1" style={{ 
                                                                overflow: 'hidden', 
                                                                textOverflow: 'ellipsis', 
                                                                whiteSpace: 'nowrap',
                                                                maxWidth: '300px'
                                                            }}>
                                                                {product.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div style={{
                                                            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                                            padding: '8px 16px',
                                                            borderRadius: '8px',
                                                            fontWeight: '600',
                                                            color: '#059669'
                                                        }}>
                                                            Qty: 1
                                                        </div>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => handleRemove(item.id, product.name)}
                                                            style={{ borderRadius: '8px' }}
                                                        >
                                                            🗑️ Remove
                                                        </Button>
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        })}
                                    </ListGroup>
                                )}
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="p-4 shadow-sm" style={{ borderRadius: '15px', position: 'sticky', top: '100px' }}>
                                <h5 className="mb-3">Order Summary</h5>
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="text-muted">Subtotal ({items.length} items)</div>
                                    <div className="fw-bold">Rp {subtotal.toLocaleString('id-ID')}</div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="text-muted">Shipping</div>
                                    <div className="text-success fw-bold">Free</div>
                                </div>
                                <hr className="my-3" />
                                <div className="d-flex justify-content-between">
                                    <div className="fs-5 fw-bold">Total</div>
                                    <div className="fs-5 fw-bold text-primary-custom">Rp {subtotal.toLocaleString('id-ID')}</div>
                                </div>

                                <Button 
                                    className="btn-primary-custom btn-checkout w-100 mt-4" 
                                    disabled={items.length === 0}
                                    onClick={handleCheckout}
                                    style={{ padding: '12px', borderRadius: '10px', fontSize: '1.1rem' }}
                                >
                                    {items.length === 0 ? '� Cart is Empty' : '�💳 Proceed to Checkout'}
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    )
}