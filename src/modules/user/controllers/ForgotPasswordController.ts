import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  private sendForgotPasswordEmailService: SendForgotPasswordEmailService;

  constructor() {
    this.sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService
    );
  }

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { email } = request.body;

    await this.sendForgotPasswordEmailService.execute({ email });

    return response.status(StatusCodes.NO_CONTENT).json();
  };
}
