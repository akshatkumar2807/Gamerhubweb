import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, getCartTotal } = useCart();

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart, total: getCartTotal() })
            });

            if (response.ok) {
                alert('Order placed successfully!');
                // Ideally clear cart here, but for now just show alert
                localStorage.removeItem('cart');
                window.location.reload();
            } else {
                alert('Failed to place order.');
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert('Error processing checkout.');
        }
    };

    return (
        <div className="container cart-page">
            <h1 className="page-title">Your <span className="text-gradient">Loot</span></h1>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your inventory is empty.</p>
                    <a href="/shop" className="btn-neon">Go Shopping</a>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="cart-item-price">${item.price}</p>
                                    <p className="cart-item-qty">Qty: {item.quantity || 1}</p>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="total-price">${getCartTotal().toFixed(2)}</span>
                        </div>
                        <button className="btn-neon full-width" onClick={handleCheckout}>
                            Checkout <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
