import * as yup from "yup";
import { CustomError } from "./custom-error";

export class ValidationError extends CustomError {
  statusCode = 400;

  constructor(private error: yup.ValidationError) {
    super("Validation error");

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.error.inner.map((error) => ({
      message: error.message,
      field: error.path,
    }));
  }
}
