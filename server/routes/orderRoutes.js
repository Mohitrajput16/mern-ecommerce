// server/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import { getOrderById ,getOrders, // <-- Import
  updateOrderToDelivered} from '../controllers/orderController.js';

// When a POST request comes to '/', first run 'protect' middleware, then 'createOrder'
router.route('/').post(protect, createOrder)
.get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById);


router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); // <-- Add this

export default router;