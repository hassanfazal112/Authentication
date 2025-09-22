import { NextFunction, Request, Response } from 'express';
import HTTPException from '@/utils/helpers/http-exception';
import multer from 'multer';

const errorHandler = (
  err: Error | HTTPException,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  // Explicitly specify return type
  console.error('error', err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error',
    });
  }

  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const statusCode = (err as HTTPException).statusCode || 500;
  const message = err.message || 'An internal server error occurred';

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
