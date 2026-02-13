import React from 'react';
import './Hub.css';

const Hub = () => {
    const posts = [
        {
            id: 1,
            title: "The Future of VR Gaming",
            excerpt: "Dive deep into the latest advancements in virtual reality technology and what it means for the next generation of gamers.",
            image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=500",
            date: "Oct 12, 2025",
            author: "Alex 'Glitch' Rider"
        },
        {
            id: 2,
            title: "Top 10 Mechanical Keyboards for 2026",
            excerpt: "We review the clickiest, most tactile, and durable keyboards hitting the market this year.",
            image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60",
            date: "Oct 10, 2025",
            author: "Sarah Keyz"
        },
        {
            id: 3,
            title: "Esports Championship Highlights",
            excerpt: "Relive the most intense moments from the global finals in Seoul.",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60",
            date: "Oct 08, 2025",
            author: "ProGamerDaily"
        }
    ];

    return (
        <div className="container hub-page">
            <div className="hub-header">
                <h1 className="page-title">Community <span className="text-gradient">Hub</span></h1>
                <p className="hub-subtitle">News, Reviews, and Culture</p>
            </div>

            <div className="hub-grid">
                {posts.map(post => (
                    <article className="hub-card" key={post.id}>
                        <div className="hub-image-wrapper">
                            <img src={post.image} alt={post.title} className="hub-image" />
                            <span className="hub-date">{post.date}</span>
                        </div>
                        <div className="hub-content">
                            <span className="hub-author">By {post.author}</span>
                            <h3 className="hub-title">{post.title}</h3>
                            <p className="hub-excerpt">{post.excerpt}</p>
                            <button className="btn-neon small">Read Article</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Hub;
