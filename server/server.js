import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Routes
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Middleware & Models
import errorHandler from './middleware/errorHandler.js';
import Category from './models/Category.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Frontend URL
  credentials: true               // ✅ Allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// 📁 Static upload folder setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
  console.log('📁 uploads/ folder created');
}
app.use('/uploads', express.static(uploadsPath));

// ✅ API Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// ❌ Error Handler
app.use(errorHandler);

// 🌱 Seed default categories
const seedDefaultCategories = async () => {
  const existing = await Category.find();
  if (existing.length === 0) {
    const defaults = ['Technology', 'Health', 'Education', 'Lifestyle', 'Travel'];
    await Category.insertMany(defaults.map(name => ({ name })));
    console.log('🌱 Default categories seeded');
  }
};

// 🚀 Start server
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await seedDefaultCategories();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
