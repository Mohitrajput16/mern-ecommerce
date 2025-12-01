// server/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { getUsers, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route to get all users (Admin only)
router.route('/').get(protect, admin, getUsers);

// Route to delete a user (Admin only)
router.route('/:id').delete(protect, admin, deleteUser);

export default router;