import Wishlist from '../models/Wishlist.js';

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id }).populate('productId');

    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const exists = await Wishlist.findOne({ userId: req.user._id, productId });

    if (exists) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    const item = await Wishlist.create({ userId: req.user._id, productId });

    const populated = await item.populate('productId');

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const removedItem = await Wishlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!removedItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};
