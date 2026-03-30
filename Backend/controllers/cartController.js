import Cart from '../models/Cart.js';

// ✅ one function, used by all handlers
const getPopulatedCart = async (userId) => {
  const cart = await Cart.find({ userId }).populate('productId').lean();
  return cart.map((item) => ({
    ...item,
    product: item.productId || null, // ✅ always has 'product'
  }));
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

    const existing = await Cart.findOne({
      userId: req.user._id,
      productId,
    });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await Cart.create({
        userId: req.user._id,
        productId,
        quantity,
      });
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
    await Cart.findByIdAndDelete(req.params.id);

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
