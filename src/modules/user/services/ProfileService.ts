import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import User from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
}

class ProfileService {
  public async create({ user_id }: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', StatusCodes.NOT_FOUND);
    }

    return user;
  }
}

export default ProfileService;
