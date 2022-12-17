import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class Controller {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public index = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const listUsers = await this.userService.index();

    return response.json(listUsers);
  };

  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { name, emial: email, password } = request.body;

    const user = await this.userService.create({ name, email, password });

    return response.json(user);
  };
}
