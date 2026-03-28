import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    console.log('protect token received:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('protect token decoded:', decoded);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('protect auth error', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
