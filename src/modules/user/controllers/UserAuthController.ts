import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserAuthService from '../services/UserAuthService';

export default class UserAuthController {
  private userAuthService: UserAuthService;

  constructor() {
    this.userAuthService = container.resolve(UserAuthService);
  }

  public execute = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { email, password } = request.body;

    const user = await this.userAuthService.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  };
}
