import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/', protect, getCart);

router.post('/', protect, addToCart);

router.delete('/clear', protect, clearCart);
router.delete('/:id', protect, removeFromCart);


export default router;
