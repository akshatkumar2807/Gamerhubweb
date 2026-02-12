import React from 'react';
import { Facebook, Twitter, Instagram, Twitch } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Gamer<span className="highlight">Hub</span></h3>
                    <p>The ultimate destination for elite gaming gear and community.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/hub">Community Hub</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Twitch size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 GamerHub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
