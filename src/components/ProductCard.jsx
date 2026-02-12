import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="product-card">
            <div className="card-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.isNew && <span className="tag new">New Arrival</span>}
                <div className="overlay">
                    <button className="quick-view-btn">Quick View</button>
                </div>
            </div>
            <div className="card-content">
                <span className="category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="rating">
                    <Star size={14} fill="var(--neon-secondary)" color="var(--neon-secondary)" />
                    <span>{product.rating}</span>
                </div>
                <div className="card-footer">
                    <span className="price">${product.price}</span>
                    <button className="add-btn" aria-label="Add to cart" onClick={() => addToCart(product)}>
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
