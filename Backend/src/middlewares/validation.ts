// middlewares/validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      let combinedMessage = '';

      if (messages.length === 1) {
        combinedMessage = messages[0];
      } else if (messages.length === 2) {
        combinedMessage = `${messages[0]} & ${messages[1]}`;
      } else {
        combinedMessage =
          messages.slice(0, -1).join(', ') +
          ` & ${messages[messages.length - 1]}`;
      }

      res.status(400).json({
        success: false,
        message: `Validation failed: ${combinedMessage}`,
      });
      return;
    }
    next();
  };
};
