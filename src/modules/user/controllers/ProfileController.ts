import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProfileService from '../services/ProfileService';

export default class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = container.resolve(ProfileService);
  }

  public show = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const user_id = request.user.id;
    const user = await this.profileService.show({ user_id });

    return response.json(instanceToInstance(user));
  };

  public update = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const userId = request.user.id;
    const { name, email, password, old_password } = request.body;

    const user = await this.profileService.update({
      user_id: userId,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  };
}
