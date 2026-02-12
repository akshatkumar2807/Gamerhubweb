import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to recover cart from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            // Check if item exists
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const getCartTotal = () => {
        return (Array.isArray(cart) ? cart : []).reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const getCartCount = () => {
        return (Array.isArray(cart) ? cart : []).reduce((count, item) => count + (item.quantity || 1), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
