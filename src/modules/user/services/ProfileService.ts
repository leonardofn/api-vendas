import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../models/show-user.model';
import { IUpdateProfile } from '../models/update-profile.model';
import { IUserRepository } from '../models/user-repository.model';
import { IUser } from '../models/user.model';

@injectable()
class ProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async show({ user_id }: IShowUser): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', StatusCodes.NOT_FOUND);
    }

    return user;
  }

  public async update({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', StatusCodes.NOT_FOUND);
    }

    const userEmail = await this.userRepository.findByEmail(email);

    if (userEmail && userEmail.id !== user_id) {
      throw new AppError(
        'There is already another user using this email address.',
        StatusCodes.CONFLICT
      );
    }

    if (password && !old_password) {
      throw new AppError('The old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.userRepository.save(user);

    return user;
  }
}

export default ProfileService;
