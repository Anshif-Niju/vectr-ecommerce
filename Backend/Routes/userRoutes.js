import express from 'express';
import {
  login,
  register,
  getMe,
  resetPassword,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateUserSchema,
} from '../validations/userValidation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/me', protect, getMe);
router.get('/', protect, admin, getAllUsers); // admin only
router.patch('/:id', protect, admin, validate(updateUserSchema), updateUser); // admin only

export default router;
