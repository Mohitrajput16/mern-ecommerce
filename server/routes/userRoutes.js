// server/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { getUsers, deleteUser,getUserProfile,updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route to get all users (Admin only)
router.route('/').get(protect, admin, getUsers);

// Route to delete a user (Admin only)
router.route('/:id').delete(protect, admin, deleteUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;