import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify if the user is logged in
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Format: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from database and attach to request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Admin only middleware access restriction
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin authorization required.' });
  }
};