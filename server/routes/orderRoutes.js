// server/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// When a POST request comes to '/', first run 'protect' middleware, then 'createOrder'
router.route('/').post(protect, createOrder);

export default router;