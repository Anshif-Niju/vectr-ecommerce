import express from 'express';
import {
  getProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.patch('/:id', updateProduct);

router.post('/', createProduct);

export default router;
