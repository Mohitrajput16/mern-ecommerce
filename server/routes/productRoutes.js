// server/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
// Route for getting all products
router.route('/').get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct);

export default router;