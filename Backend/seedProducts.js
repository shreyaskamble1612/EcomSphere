import mongoose from 'mongoose';
import Product from './Models/Product.js';
import User from './Models/User.js';
import connectDB from './db.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple iPhone with A17 Pro chip, titanium design, and advanced camera system. Features a 6.1-inch Super Retina XDR display.",
    price: 999,
    category: "Electronics",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    rating: 4.8,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android smartphone with S Pen, 200MP camera, and AI-powered features. 6.8-inch Dynamic AMOLED display.",
    price: 1199,
    category: "Electronics",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"
    ],
    rating: 4.7,
    numReviews: 0,
    reviews: []
  },
  {
    name: "MacBook Air M3",
    description: "Ultra-thin laptop powered by Apple M3 chip. Perfect for students and professionals. 13.6-inch Liquid Retina display.",
    price: 1299,
    category: "Electronics",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    ],
    rating: 4.9,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling wireless headphones with 30-hour battery life and premium sound quality.",
    price: 399,
    category: "Electronics",
    stock: 32,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
    ],
    rating: 4.6,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max cushioning. Perfect for daily wear and light workouts.",
    price: 150,
    category: "Fashion",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    ],
    rating: 4.4,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-leg jeans in authentic indigo denim. Timeless style that never goes out of fashion.",
    price: 89,
    category: "Fashion",
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500"
    ],
    rating: 4.3,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Multi-functional electric pressure cooker that replaces 7 kitchen appliances. Perfect for busy families.",
    price: 129,
    category: "Home Appliances",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500"
    ],
    rating: 4.7,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Dyson V15 Detect Vacuum",
    description: "Cordless vacuum cleaner with laser dust detection and powerful suction. Up to 60 minutes runtime.",
    price: 749,
    category: "Home Appliances",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500"
    ],
    rating: 4.8,
    numReviews: 0,
    reviews: []
  },
  {
    name: "Wilson Tennis Racket Pro",
    description: "Professional-grade tennis racket used by tournament players. Lightweight frame with excellent control.",
    price: 229,
    category: "Sports",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    ],
    rating: 4.5,
    numReviews: 0,
    reviews: []
  },
  {
    name: "The Psychology of Money",
    description: "Bestselling book by Morgan Housel about the psychology behind financial decisions. A must-read for investors.",
    price: 16,
    category: "Books",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
    ],
    rating: 4.6,
    numReviews: 0,
    reviews: []
  },
  {
    name: "CeraVe Hydrating Cleanser",
    description: "Gentle face cleanser for normal to dry skin. Contains ceramides and hyaluronic acid for healthy skin barrier.",
    price: 12,
    category: "Beauty",
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    rating: 4.4,
    numReviews: 0,
    reviews: []
  },
  {
    name: "The Ordinary Niacinamide Serum",
    description: "High-strength vitamin B3 serum that helps minimize enlarged pores and regulate sebum production.",
    price: 7,
    category: "Beauty",
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500"
    ],
    rating: 4.2,
    numReviews: 0,
    reviews: []
  }
];

const seedData = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create or find admin user
    let adminUser = await User.findOne({ email: 'admin@ecomsphere.com' });
    
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@ecomsphere.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('Created admin user');
    }

    // Add seller field to each product
    const productsWithSeller = sampleProducts.map(product => ({
      ...product,
      seller: adminUser._id
    }));

    // Insert sample products
    await Product.insertMany(productsWithSeller);
    console.log(`Successfully seeded ${sampleProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();