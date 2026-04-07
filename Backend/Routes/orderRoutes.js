import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from '../validations/requestValidation.js';

const router = express.Router();

router.post('/', protect, validate(createOrderSchema), createOrder);

router.get('/my', protect, getMyOrders);

router.get('/', protect, admin, getAllOrders); // admin only
router.patch('/:id/status', protect, admin, validate(updateOrderStatusSchema), updateOrderStatus);

export default router;
