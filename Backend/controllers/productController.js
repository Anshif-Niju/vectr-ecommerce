import Product from '../models/Products.js';

const normalizeProductPayload = (req) => {
  const payload = { ...req.body };

  if (payload.price !== undefined && payload.price !== '') {
    payload.price = Number(payload.price);
  }

  if (payload.rent !== undefined && payload.rent !== '') {
    payload.rent = Number(payload.rent);
  }

  if (payload.isActive !== undefined) {
    payload.isActive = payload.isActive === 'true' || payload.isActive === true;
  }

  if (req.file) {
    payload.img = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
  }

  return payload;
};

export const getProducts = async (req, res, next) => {
  try {
    const { isActive, category, limit } = req.query;
    let filter = {};

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    let query = Product.find(filter);

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const products = await query;

    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductPayload(req);
    const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductPayload(req);

    if (!payload.img) {
      res.status(400);
      throw new Error('Product image is required');
    }

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
