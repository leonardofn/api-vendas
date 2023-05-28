import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ILoginUser } from '../models/login-user.model';
import { IUserAuthenticated } from '../models/user-authenticated.model';
import { IUserRepository } from '../models/user-repository.model';

@injectable()
class UserAuthService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    email,
    password,
  }: ILoginUser): Promise<IUserAuthenticated> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Incorrect email/password combination.',
        StatusCodes.UNAUTHORIZED
      );
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(
        'Incorrect email/password combination.',
        StatusCodes.UNAUTHORIZED
      );
    }

    const secret = authConfig.jwt.secret ?? '';
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default UserAuthService;
