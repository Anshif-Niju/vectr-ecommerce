import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  category: String,
  isActive: { type: Boolean, default: true },
  smallDes: String,
  rent: Number,
});

export default mongoose.model('Product', productSchema);
