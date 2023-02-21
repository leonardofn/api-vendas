import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UserAvatarService from '../services/UserAvatarService';

export default class UserAvatarController {
  private userAvatarService: UserAvatarService;

  constructor() {
    this.userAvatarService = new UserAvatarService();
  }

  public update = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const user = await this.userAvatarService.uploadAvatar({
      user_id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });

    return response.json(instanceToInstance(user));
  };
}
