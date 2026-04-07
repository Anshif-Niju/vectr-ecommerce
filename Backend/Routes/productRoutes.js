import express from 'express';
import {
  getProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
} from '../controllers/productController.js';
import uploadProductImage from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.patch('/:id', uploadProductImage.single('img'), updateProduct);

router.post('/', uploadProductImage.single('img'), createProduct);

export default router;
