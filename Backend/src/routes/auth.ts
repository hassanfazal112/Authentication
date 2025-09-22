import express from 'express';
import {
  signupController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  signoutController,
} from '@/controllers/auth';
import { validate } from '@/middlewares/validation';
import {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@/validations/auth';

const authRouter = express.Router();

// Authentication routes
authRouter.post('/signup', validate(signupSchema), signupController);
authRouter.post('/signin', validate(signinSchema), signinController);
authRouter.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  forgotPasswordController,
);
authRouter.post(
  '/reset-password',
  validate(resetPasswordSchema),
  resetPasswordController,
);
authRouter.post('/signout', signoutController);

export default authRouter;
