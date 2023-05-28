import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  private resetPasswordService: ResetPasswordService;

  constructor() {
    this.resetPasswordService = container.resolve(ResetPasswordService);
  }

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { password, token } = request.body;

    await this.resetPasswordService.execute({ token, password });

    return response.status(StatusCodes.NO_CONTENT).json();
  };
}
