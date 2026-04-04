require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Serve frontend for all non-API routes
app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.status(404).json({ message: "API route not found" });
});

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    if (process.env.NODE_ENV !== "development") {
      await seedData();
    }
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Smart Store running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌ FULL ERROR:");
    console.error(err);
  });

// Seed admin + sample products
async function seedData() {
  const User = require('./models/User');
  const Product = require('./models/Product');

  // Create admin if not exists
  const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  const hashedPassword = process.env.ADMIN_PASSWORD;
  if (!adminExists) {
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin account created:', process.env.ADMIN_EMAIL);
    console.log('Admin password: ', process.env.ADMIN_PASSWORD);
  }

  // Seed products if empty
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [
      // Mobiles
      { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'mobiles', price: 124999, originalPrice: 134999, rating: 4.8, reviewCount: 2341, stock: 15, isFeatured: true, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80', description: 'The ultimate Galaxy experience with S Pen, 200MP camera, and AI features.', features: ['200MP Camera', 'S Pen included', 'Snapdragon 8 Gen 3', '5000mAh Battery', '6.8" QHD+ Display'] },
      { name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'mobiles', price: 159900, originalPrice: 169900, rating: 4.9, reviewCount: 4521, stock: 10, isFeatured: true, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80', description: 'Titanium design, A17 Pro chip, and the most advanced camera system.', features: ['A17 Pro Chip', '48MP Main Camera', 'Titanium Frame', 'USB-C', 'Action Button'] },
      { name: 'OnePlus 12', brand: 'OnePlus', category: 'mobiles', price: 64999, originalPrice: 69999, rating: 4.6, reviewCount: 1234, stock: 20, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80', description: 'Flagship killer with Snapdragon 8 Gen 3 and Hasselblad camera tuning.', features: ['Snapdragon 8 Gen 3', 'Hasselblad Cameras', '100W Fast Charging', '6.82" Display', '50MP Main Camera'] },
      { name: 'Xiaomi 14 Pro', brand: 'Xiaomi', category: 'mobiles', price: 89999, originalPrice: 94999, rating: 4.5, reviewCount: 876, stock: 18, image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&q=80', description: 'Leica-tuned cameras with Snapdragon 8 Gen 3 and 120W HyperCharge.', features: ['Leica Cameras', '120W HyperCharge', 'Snapdragon 8 Gen 3', 'AMOLED Display', '50MP Triple Camera'] },

      // Laptops
      { name: 'MacBook Pro 16" M3', brand: 'Apple', category: 'laptops', price: 249900, originalPrice: 269900, rating: 4.9, reviewCount: 3421, stock: 8, isFeatured: true, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', description: 'Supercharged by M3 Pro or M3 Max chip for exceptional performance.', features: ['Apple M3 Pro Chip', '18GB Unified Memory', '16" Liquid Retina XDR', '22hr Battery', 'MagSafe Charging'] },
      { name: 'Dell XPS 15', brand: 'Dell', category: 'laptops', price: 189999, originalPrice: 199999, rating: 4.7, reviewCount: 1876, stock: 12, isFeatured: true, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80', description: 'Premium ultrabook with OLED display and Intel Core i9 performance.', features: ['Intel Core i9-13900H', 'RTX 4060', '15.6" OLED 3.5K', '32GB DDR5 RAM', '1TB SSD'] },
      { name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', category: 'laptops', price: 149999, originalPrice: 164999, rating: 4.6, reviewCount: 987, stock: 15, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80', description: 'Ultralight business laptop with military-grade durability.', features: ['Intel Core i7-1365U', '16GB RAM', '14" IPS Display', '15hr Battery', 'Fingerprint Reader'] },
      { name: 'ASUS ROG Strix G16', brand: 'ASUS', category: 'laptops', price: 129999, originalPrice: 144999, rating: 4.7, reviewCount: 1543, stock: 10, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80', description: 'Gaming powerhouse with RTX 4070 and 240Hz display.', features: ['Intel Core i9-13980HX', 'RTX 4070 8GB', '16" 240Hz QHD', '16GB DDR5', 'RGB Keyboard'] },

      // Smartwatches
      { name: 'Apple Watch Series 9', brand: 'Apple', category: 'smartwatches', price: 41900, originalPrice: 45900, rating: 4.8, reviewCount: 5321, stock: 25, isFeatured: true, image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80', description: 'The most advanced Apple Watch with double tap gesture.', features: ['S9 SiP Chip', 'Always-On Retina', 'Double Tap', 'ECG App', 'Blood Oxygen Sensor'] },
      { name: 'Samsung Galaxy Watch 6', brand: 'Samsung', category: 'smartwatches', price: 29999, originalPrice: 34999, rating: 4.6, reviewCount: 2134, stock: 20, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', description: 'Advanced health tracking with sapphire crystal display.', features: ['Sapphire Crystal', 'BioActive Sensor', 'Sleep Coaching', 'Body Composition', 'GPS'] },
      { name: 'Garmin Fenix 7 Pro', brand: 'Garmin', category: 'smartwatches', price: 79999, originalPrice: 84999, rating: 4.7, reviewCount: 876, stock: 12, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80', description: 'Premium multisport GPS smartwatch for serious athletes.', features: ['Solar Charging', 'Topographic Maps', 'Multi-Band GPS', '22-day Battery', 'Sapphire Lens'] },

      // Audio
      { name: 'Sony WH-1000XM5', brand: 'Sony', category: 'audio', price: 29990, originalPrice: 34990, rating: 4.8, reviewCount: 6543, stock: 30, isFeatured: true, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', description: 'Industry-leading noise canceling headphones with 30-hour battery.', features: ['Industry-Best ANC', '30hr Battery', 'LDAC Hi-Res Audio', 'Multipoint Connection', 'Quick Charge'] },
      { name: 'Apple AirPods Pro (2nd Gen)', brand: 'Apple', category: 'audio', price: 24900, originalPrice: 26900, rating: 4.7, reviewCount: 8765, stock: 35, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80', description: 'H2 chip powers smarter noise cancellation with Adaptive Audio.', features: ['H2 Chip', 'Adaptive Transparency', 'Personalized Spatial Audio', 'MagSafe Charging', 'IP54 Rating'] },
      { name: 'Bose QuietComfort 45', brand: 'Bose', category: 'audio', price: 24500, originalPrice: 29000, rating: 4.6, reviewCount: 3210, stock: 22, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80', description: 'Legendary Bose noise cancellation in a lightweight design.', features: ['World-Class ANC', '24hr Battery', 'TriPort Acoustic', 'Adjustable EQ', 'USB-C Charging'] },
      { name: 'JBL Charge 5', brand: 'JBL', category: 'audio', price: 14999, originalPrice: 17999, rating: 4.5, reviewCount: 4321, stock: 40, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', description: 'Portable Bluetooth speaker with 20-hour battery and power bank.', features: ['IP67 Waterproof', '20hr Battery', 'Power Bank Feature', 'PartyBoost', 'Deep Bass'] }
    ];
    await Product.insertMany(products);
    console.log('✅ Sample products seeded');
  }
}
