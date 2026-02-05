// server/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getAllProducts,       // <--- Changed from getAllProducts to match Controller
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getRelatedProducts, // <--- Ensure this is imported
  getCategories,      // <--- Combined import
  getTopProducts      // <--- Don't forget this if you use it!
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// 1. General Routes (Match /)
router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

// 2. Specific Static Routes (Match /something)
// These MUST come before /:id or they will be treated as an ID
router.route('/categories').get(getCategories);
router.route('/top').get(getTopProducts); 

// 3. Parameterized Routes (Match /:id/something)
router.route('/:id/related').get(getRelatedProducts);
// router.route('/:id/reviews').post(protect, createProductReview); // If you have reviews

// 4. ID Route (Matches /:id)
// This captures anything else, so it must be last
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;