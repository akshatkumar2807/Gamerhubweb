const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Load data paths
const productsPath = path.join(__dirname, 'data', 'products.json');
const ordersPath = path.join(__dirname, 'data', 'orders.json');

// Initial Data Seeding
const seeds = [
    {
        id: 1,
        name: "CyberDeck X1 Mechanical Keyboard",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60",
        category: "Keyboards",
        rating: 4.8,
        isNew: true
    },
    {
        id: 2,
        name: "NeonStrike Pro Mouse",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60",
        category: "Mouse",
        rating: 4.6,
        isNew: false
    },
    {
        id: 3,
        name: "AudioX 7.1 Headset",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60",
        category: "Audio",
        rating: 4.7,
        isNew: true
    },
    {
        id: 4,
        name: "Titanium Gaming Chair",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=60",
        category: "Furniture",
        rating: 4.5,
        isNew: false
    },
    {
        id: 5,
        name: "Ultrawide 144Hz Monitor",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
        category: "Monitors",
        rating: 4.9,
        isNew: true
    },
    {
        id: 6,
        name: "StreamDeck Mini",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60",
        category: "Streaming",
        rating: 4.4,
        isNew: false
    },
    {
        id: 7,
        name: "StealthOps Mechanic 60%",
        price: 109.99,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1000",
        category: "Keyboards",
        rating: 4.5,
        isNew: false
    },
    {
        id: 8,
        name: "ViperSpeed Wireless",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500&auto=format&fit=crop&q=60",
        category: "Mouse",
        rating: 4.7,
        isNew: true
    },
    {
        id: 9,
        name: "PixelBuds Gaming Pro",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
        category: "Earphones",
        rating: 4.8,
        isNew: true
    },
    {
        id: 10,
        name: "BassRaider Wired Earbuds",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60",
        category: "Earphones",
        rating: 4.3,
        isNew: false
    },
    {
        id: 11,
        name: "BoomBox RGB Soundbar",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60",
        category: "Speakers",
        rating: 4.6,
        isNew: true
    },
    {
        id: 12,
        name: "Arena Surround 2.1 System",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1558403194-611308249627?w=500&auto=format&fit=crop&q=60",
        category: "Speakers",
        rating: 4.9,
        isNew: false
    }
];

if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, JSON.stringify(seeds, null, 2));
}

// API Routes
app.get('/api/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(productsPath));
    const { search } = req.query;

    if (search) {
        const term = search.toLowerCase();
        const filtered = data.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
        return res.json(filtered);
    }

    res.json(data);
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    const orders = fs.existsSync(ordersPath) ? JSON.parse(fs.readFileSync(ordersPath)) : [];

    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...order
    };

    orders.push(newOrder);
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
