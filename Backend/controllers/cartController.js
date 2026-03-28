import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const cart = await Cart.find({ userId: req.user._id })
      .populate('productId')
      .lean();

    const normalized = cart.map((item) => ({
      ...item,
      product: item.productId || item.product || null,
    }));

    return res.json(normalized);
  } catch (error) {
    console.error('getCart error', error);
    return res
      .status(500)
      .json({ message: 'Could not fetch cart', error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let item = await Cart.findOne({
      userId: req.user._id,
      productId,
    });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      await Cart.create({
        userId: req.user._id,
        productId,
        quantity,
      });
    }

    const updatedCart = await Cart.find({ userId: req.user._id }).populate(
      'productId',
    );

    res.json(updatedCart);
  } catch (error) {
    console.error('addToCart error', error);
    res
      .status(500)
      .json({ message: 'Could not update cart', error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);

  const updatedCart = await Cart.find({ userId: req.user._id }).populate(
    'productId',
  );

  res.json(updatedCart);
};

export const clearCart = async (req, res) => {
  await Cart.deleteMany({ userId: req.user._id });
  res.json([]);
};
