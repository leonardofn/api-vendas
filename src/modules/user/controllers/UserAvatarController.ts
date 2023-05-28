import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserAvatarService from '../services/UserAvatarService';

export default class UserAvatarController {
  private userAvatarService: UserAvatarService;

  constructor() {
    this.userAvatarService = container.resolve(UserAvatarService);
  }

  public update = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const user = await this.userAvatarService.uploadAvatar({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(instanceToInstance(user));
  };
}
