// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // <-- 1. Import routes
import productRoutes from './routes/productRoutes.js'; // <-- 1. Import product routes
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json()); // <-- 2. Add middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes
app.use('/api/auth', authRoutes); // <-- 3. Tell Express to use authRoutes
app.use('/api/products', productRoutes); // <-- 2. Tell Express to use productRoutes

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);