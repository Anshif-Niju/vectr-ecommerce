import Joi from 'joi';

const objectId = Joi.string().trim().hex().length(24);

export const addToCartSchema = Joi.object({
  productId: objectId.required(),
  quantity: Joi.number().integer().min(1).default(1),
});

export const addToWishlistSchema = Joi.object({
  productId: objectId.required(),
});

export const feedbackSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().lowercase().email().required(),
  message: Joi.string().trim().min(10).max(1000).required(),
});

export const createOrderSchema = Joi.object({
  paymentMethod: Joi.string().valid('COD', 'CARD', 'UPI').required(),
  address: Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().lowercase().email().required(),
    number: Joi.string().trim().min(10).max(15).required(),
    city: Joi.string().trim().min(2).max(50).required(),
    address: Joi.string().trim().min(10).max(200).required(),
  }).required(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('Processing', 'Delivery Soon', 'Delivery Today', 'Delivery Completed')
    .required(),
});
