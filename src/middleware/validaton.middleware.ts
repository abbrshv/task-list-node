import { Schema } from 'yup';
import { NextFunction, Request, Response } from 'express';

const validate = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (error: any) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

export default validate;
