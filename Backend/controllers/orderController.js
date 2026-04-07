import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res, next) => {
  try {
    const { address, paymentMethod } = req.body;

    const cartItems = await Cart.find({ userId: req.user._id }).populate('productId');

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId: req.user._id,
      products: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalPrice,
      address,
      paymentMethod,
      status: 'Processing',
      orderDate: new Date(),
    });

    await Cart.deleteMany({ userId: req.user._id });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('products.productId')
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })
      .populate('products.productId')
      .populate('userId', 'username email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};
