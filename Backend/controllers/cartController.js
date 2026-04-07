import Cart from '../models/Cart.js';
import Product from '../models/Products.js';

const getPopulatedCart = async (userId) => {
  const cart = await Cart.find({ userId }).populate('productId').lean();
  return cart.map((item) => ({ ...item, product: item.productId || null }));
};

export const getCart = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const cart = await getPopulatedCart(req.user._id);

    return res.json(cart);
  } catch (error) {
    console.error('getCart error', error);

    return res.status(500).json({ message: 'Could not fetch cart' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const parsedQuantity = Number(quantity);

    if (!req.user?._id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity === 0) {
      return res.status(400).json({ message: 'Quantity must be a non-zero whole number' });
    }

    const product = await Product.findById(productId).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existing = await Cart.findOne({ userId: req.user._id, productId });

    if (existing) {
      const nextQuantity = existing.quantity + parsedQuantity;

      if (nextQuantity <= 0) {
        await existing.deleteOne();
      } else {
        existing.quantity = nextQuantity;
        await existing.save();
      }
    } else {
      if (parsedQuantity < 0) {
        return res.status(400).json({ message: 'Item quantity cannot go below 1' });
      }

      await Cart.create({ userId: req.user._id, productId, quantity: parsedQuantity });
    }

    // ✅ use shared normalizer
    const cart = await getPopulatedCart(req.user._id);
    res.json(cart);
  } catch (error) {
    console.error('addToCart error', error);
    res.status(500).json({ message: 'Could not update cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const removedCartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!removedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // ✅ use shared normalizer
    const cart = await getPopulatedCart(req.user._id);
    res.json(cart);
  } catch (error) {
    console.error('removeFromCart error', error);
    res.status(500).json({ message: 'Could not remove item' });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user._id });
    res.json([]);
  } catch (error) {
    console.error('clearCart error', error);
    res.status(500).json({ message: 'Could not clear cart' });
  }
};
