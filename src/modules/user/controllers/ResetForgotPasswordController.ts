import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  private resetPasswordService: ResetPasswordService;

  constructor() {
    this.resetPasswordService = new ResetPasswordService();
  }

  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { password, token } = request.body;

    await this.resetPasswordService.execute({ password, token });

    return response.status(StatusCodes.NO_CONTENT).json();
  };
}
