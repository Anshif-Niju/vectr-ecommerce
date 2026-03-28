import express from 'express';
import {
  login,
  register,
  getMe,
  resetPassword,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { registerSchema } from '../validations/userValidation.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.get('/', protect, admin, getAllUsers); // admin only
router.patch('/:id', protect, admin, updateUser); // admin only

export default router;
