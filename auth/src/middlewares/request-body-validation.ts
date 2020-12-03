import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ValidationError } from "../errors/validation-error";
export const requestBodyValidation = (
  validationSchema: yup.ObjectSchema
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validationSchema.validate(req.body, {
      abortEarly: false,
    });
  } catch (e) {
    throw new ValidationError(e);
  }

  next();
};
