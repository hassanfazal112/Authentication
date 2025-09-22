import { RequestHandler } from 'express';
import logger from '@/utils/logger';
import HTTPException from '@/utils/helpers/http-exception';
import {
  ISignupRequest,
  ISignupResponse,
  ISigninRequest,
  ISigninResponse,
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
} from '@/types/interfaces/auth';
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  signout,
} from '@/services/auth';

export const signupController: RequestHandler<
  object,
  ISignupResponse,
  ISignupRequest
> = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const response = await signup(name, email, password, phoneNumber);

    res.status(201).json(response);
  } catch (err) {
    logger.error('Error during signup:', err);
    if (err instanceof HTTPException) {
      return next(err);
    }
    return next(HTTPException.internalServerError('Error during signup'));
  }
};

export const signinController: RequestHandler<
  object,
  ISigninResponse,
  ISigninRequest
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const response = await signin(email, password);

    res.status(200).json(response);
  } catch (err) {
    logger.error('Error during signin:', err);
    if (err instanceof HTTPException) {
      return next(err);
    }
    return next(HTTPException.internalServerError('Error during signin'));
  }
};

export const forgotPasswordController: RequestHandler<
  object,
  IForgotPasswordResponse,
  IForgotPasswordRequest
> = async (req, res, next) => {
  try {
    const { email } = req.body;

    const response = await forgotPassword(email);

    res.status(200).json(response);
  } catch (err) {
    logger.error('Error during forgot password:', err);
    if (err instanceof HTTPException) {
      return next(err);
    }
    return next(
      HTTPException.internalServerError('Error during forgot password'),
    );
  }
};

export const resetPasswordController: RequestHandler<
  object,
  IResetPasswordResponse,
  IResetPasswordRequest
> = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const response = await resetPassword(token, password);

    res.status(200).json(response);
  } catch (err) {
    logger.error('Error during reset password:', err);
    if (err instanceof HTTPException) {
      return next(err);
    }
    return next(
      HTTPException.internalServerError('Error during reset password'),
    );
  }
};

export const signoutController: RequestHandler = async (_req, res, next) => {
  try {
    const response = await signout();

    res.status(200).json(response);
  } catch (err) {
    logger.error('Error during signout:', err);
    if (err instanceof HTTPException) {
      return next(err);
    }
    return next(HTTPException.internalServerError('Error during signout'));
  }
};
