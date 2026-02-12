import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                // Just take first 3 as trending for now
                setTrendingProducts(data.slice(0, 3));
            })
            .catch(err => console.error("Failed to fetch products:", err));
    }, []);

    const categories = [
        { id: 1, name: 'Keyboards', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60' },
        { id: 2, name: 'Audio', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60' },
        { id: 3, name: 'Mice', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60' }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">
                    Gamers<br /><span style={{ color: 'var(--neon-primary)' }}>Hub</span>
                </h1>
                <p className="hero-subtitle">ELITE GEAR FOR THE NEXT LEVEL</p>
                <div className="hero-actions">
                    <Link to="/shop">
                        <button className="btn-neon">Shop Collection</button>
                    </Link>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="categories-section container">
                <h2 className="section-title">Featured <span style={{ color: 'var(--neon-primary)' }}>Gear</span></h2>
                <div className="category-grid">
                    {categories.map(cat => (
                        <div key={cat.id} className="category-card">
                            <img src={cat.image} alt={cat.name} />
                            <div className="category-overlay">
                                <h3>{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Section */}
            <section className="trending-section container">
                <h2 className="section-title">Trending <span style={{ color: 'var(--neon-primary)' }}>Now</span></h2>
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {trendingProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link to="/shop">
                        <button className="btn-neon">View All Products</button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
