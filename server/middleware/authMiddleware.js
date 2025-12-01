// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token (and exclude the password)
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // Move on to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };