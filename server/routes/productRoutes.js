// server/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
} from '../controllers/productController.js';

// Route for getting all products
router.route('/').get(getAllProducts);

// Route for getting a single product by its ID
router.route('/:id').get(getProductById);

export default router;