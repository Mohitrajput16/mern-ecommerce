// server/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct, // <-- Import
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
// Route for getting all products
router.route('/')
.get(getAllProducts)
.post(protect, admin, createProduct); // <-- POST to create

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct); // <-- PUT to update

export default router;