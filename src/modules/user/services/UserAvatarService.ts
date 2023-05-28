import AppError from '@shared/errors/AppError';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import uploadConfig from '../../../config/upload';
import { IUpdateUserAvatar } from '../models/update-user-avatar.model';
import { IUserRepository } from '../models/user-repository.model';
import { IUser } from '../models/user.model';

@injectable()
class UserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async uploadAvatar({
    user_id,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

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

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UserAvatarService;
