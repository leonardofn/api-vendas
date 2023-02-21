import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public index = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const listUsers = await this.userService.index();

    return response.json(instanceToInstance(listUsers));
  };

  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { name, email, password } = request.body;

    const user = await this.userService.create({ name, email, password });

    return response.json(instanceToInstance(user));
  };
}
