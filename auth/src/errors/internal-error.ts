import { CustomError } from "./custom-error";

export class InternalError extends CustomError {
  statusCode = 500;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InternalError);
  }

  serializeErrors() {
    return [{ message: "Internal error" }];
  }
}
