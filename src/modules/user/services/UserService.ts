import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../models/create-user.model';
import { IUserRepository } from '../models/user-repository.model';
import { IUser } from '../models/user.model';

@injectable()
class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used.', StatusCodes.CONFLICT);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  public async index(): Promise<IUser[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export default UserService;
