import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
      },
    ],
    totalPrice: Number,
    address: Object,
    paymentMethod: String,
    status: {
      type: String,
      default: 'Processing',
    },
    orderDate: Date,
  },
  { timestamps: true },
);

export default mongoose.model('Order', orderSchema);
