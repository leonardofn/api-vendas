import AppError from '@shared/errors/AppError';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import uploadConfig from '../../../config/upload';
import User from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UserAvatarService {
  public async uploadAvatar({
    user_id,
    avatarFileName,
  }: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await UserRepository.save(user);

    return user;
  }
}

export default UserAvatarService;
