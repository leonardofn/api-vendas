import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import User from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

class UserAuthService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}

export default UserAuthService;
