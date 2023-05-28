import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IResetPassword } from '../models/reset-password.model';
import { IUserRepository } from '../models/user-repository.model';
import { IUserTokensRepository } from '../models/user-tokens-repository.model';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.', StatusCodes.NOT_FOUND);
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.', StatusCodes.NOT_FOUND);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', StatusCodes.UNAUTHORIZED);
    }

    user.password = await hash(password, 8);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
