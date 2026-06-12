import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the header: "Bearer <token_string>"
      token = req.headers.authorization.split(' ')[1];

      // 2. Decode and verify the token using your JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key_change_me');

      // 3. Find the user in the database by ID and attach them to the request object (excluding the password)
      req.user = await User.findById(decoded.id).select('-password');

      // Move on to the next middleware or controller function
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }

  // If no token was found in the headers at all
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};