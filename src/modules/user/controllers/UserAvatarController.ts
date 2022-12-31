import { Request, Response } from 'express';
import UserAvatarService from '../services/UserAvatarService';

export default class UserAuthController {
  private userAvatarService: UserAvatarService;

  constructor() {
    this.userAvatarService = new UserAvatarService();
  }

  public updateAvatar = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const user = await this.userAvatarService.uploadAvatar({
      user_id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });

    return response.json(user);
  };
}
