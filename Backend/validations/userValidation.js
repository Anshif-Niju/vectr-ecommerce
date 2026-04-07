import Joi from 'joi';

const email = Joi.string().trim().lowercase().email().required();
const password = Joi.string().min(6).max(128).required();

export const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(50).required(),
  email,
  password,
});

export const loginSchema = Joi.object({
  email,
  password,
});

export const resetPasswordSchema = Joi.object({
  email,
  password,
});

export const updateUserSchema = Joi.object({
  username: Joi.string().trim().min(3).max(50),
  email: Joi.string().trim().lowercase().email(),
  isActive: Joi.boolean(),
  role: Joi.string().valid('user', 'admin'),
  profileImg: Joi.string().trim().uri().allow(''),
  profileThumbImg: Joi.string().trim().uri().allow(''),
})
  .min(1)
  .required();
