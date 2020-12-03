import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";
import { InternalError } from "../errors/internal-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  const internalError = new InternalError("Unhandled internal error");

  res.status(internalError.statusCode).send("Internal error");
};
