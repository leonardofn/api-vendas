import { StatusCodes } from 'http-status-codes';

class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = StatusCodes.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
