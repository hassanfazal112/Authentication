import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a string`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a string`,
    'string.email': `"email" should be a valid email`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]).+$',
      ),
    )
    .required()
    .messages({
      'string.base': `"password" should be a string`,
      'string.min': `"password" should have a minimum length of 8`,
      'string.pattern.base': `"password" must include uppercase, lowercase, number, and special character`,
      'any.required': `"password" is a required field`,
    }),
  phoneNumber: Joi.string().optional().messages({
    'string.base': `"phoneNumber" should be a string`,
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a string`,
    'string.email': `"email" should be a valid email`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().required().messages({
    'string.base': `"password" should be a string`,
    'any.required': `"password" is a required field`,
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a string`,
    'string.email': `"email" should be a valid email`,
    'any.required': `"email" is a required field`,
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'string.base': `"token" should be a string`,
    'any.required': `"token" is a required field`,
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]).+$',
      ),
    )
    .required()
    .messages({
      'string.base': `"password" should be a string`,
      'string.min': `"password" should have a minimum length of 8`,
      'string.pattern.base': `"password" must include uppercase, lowercase, number, and special character`,
      'any.required': `"password" is a required field`,
    }),
});
