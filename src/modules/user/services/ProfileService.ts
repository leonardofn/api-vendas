import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import User from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class ProfileService {
  public async show(user_id: string): Promise<User> {
    const user = await UserRepository.findById(user_id);

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
  }: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', StatusCodes.NOT_FOUND);
    }

    const userEmail = await UserRepository.findByEmail(email);

    if (userEmail && userEmail.id !== user_id) {
      throw new AppError(
        'There is already another user using this email address.',
        StatusCodes.CONFLICT,
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

    await UserRepository.save(user);

    return user;
  }
}

export default ProfileService;
