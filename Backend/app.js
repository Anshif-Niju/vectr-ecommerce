import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import cartRoutes from './Routes/cartRoutes.js';
import wishlistRoutes from './Routes/wishlistRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import feedbackRoutes from './Routes/feedbackRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(errorHandler);

export default app;
