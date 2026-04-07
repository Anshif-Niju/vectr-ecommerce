import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { addToWishlistSchema } from '../validations/requestValidation.js';

const router = express.Router();

router.get('/', protect, getWishlist);

router.post('/', protect, validate(addToWishlistSchema), addToWishlist);

router.delete('/:id', protect, removeFromWishlist);

export default router;
