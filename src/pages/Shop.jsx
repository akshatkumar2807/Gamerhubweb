import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to connect to server');
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading) {
            if (searchTerm) {
                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(products);
            }
        }
    }, [searchTerm, products, loading]);

    const handleFilter = (category) => {
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === category));
        }
    };

    return (
        <div className="container shop-page">
            <div className="shop-header">
                <h1 className="page-title">Elite Gear</h1>
                <div className="filters">
                    <button className="filter-btn active" onClick={() => handleFilter('All')}>All</button>
                    <button className="filter-btn" onClick={() => handleFilter('Keyboards')}>Keyboards</button>
                    <button className="filter-btn" onClick={() => handleFilter('Mouse')}>Mouse</button>
                    <button className="filter-btn" onClick={() => handleFilter('Audio')}>Audio</button>
                    <button className="filter-btn" onClick={() => handleFilter('Earphones')}>Earphones</button>
                    <button className="filter-btn" onClick={() => handleFilter('Speakers')}>Speakers</button>
                </div>
            </div>

            {error && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#ff4444' }}>
                    <h2>Connection Error</h2>
                    <p>Could not load products. Please ensure the backend server is running.</p>
                </div>
            )}

            {searchTerm && <p className="search-results">Showing results for: "{searchTerm}"</p>}

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="no-results">No gear found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default Shop;
