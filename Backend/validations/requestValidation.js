import Joi from 'joi';

const objectId = Joi.string().trim().hex().length(24);

export const addToCartSchema = Joi.object({
  productId: objectId.required(),
  quantity: Joi.number().integer().invalid(0).default(1),
});

export const addToWishlistSchema = Joi.object({
  productId: objectId.required(),
});

export const feedbackSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().lowercase().email().required(),
  message: Joi.string().trim().min(10).max(1000).required(),
});

const orderAddressSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Please enter your name',
    'string.min': 'Name must be at least 2 characters long',
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'Please enter your email address',
    'string.email': 'Please enter a valid email address',
  }),
  number: Joi.string().trim().min(10).max(15).required().messages({
    'string.empty': 'Please enter your phone number',
    'string.min': 'Phone number must be at least 10 digits long',
    'string.max': 'Phone number cannot be more than 15 digits long',
  }),
  city: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Please enter your city',
    'string.min': 'City must be at least 2 characters long',
  }),
  address: Joi.string().trim().min(10).max(200).required().messages({
    'string.empty': 'Please enter your full address',
    'string.min': 'Please enter your full address with at least 10 characters',
    'string.max': 'Address cannot be more than 200 characters long',
  }),
});

export const createOrderSchema = Joi.object({
  paymentMethod: Joi.string().valid('COD', 'CARD', 'UPI').required().messages({
    'any.only': 'Please select a valid payment method',
    'string.empty': 'Please select a payment method',
  }),
  address: orderAddressSchema.required(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('Processing', 'Delivery Soon', 'Delivery Today', 'Delivery Completed')
    .required(),
});
