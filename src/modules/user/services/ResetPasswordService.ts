import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories/UserRepository';
import { UserTokenRepository } from '../repositories/UserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UserTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.', StatusCodes.NOT_FOUND);
    }

    const user = await UserRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.', StatusCodes.NOT_FOUND);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', StatusCodes.UNAUTHORIZED);
    }

    user.password = await hash(password, 8);

    await UserRepository.save(user);
  }
}

export default ResetPasswordService;
