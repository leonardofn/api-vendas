import AppError from '@shared/errors/AppError';
import User from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  id?: string;
}

class UserService {
  public async create({ name, email, password }: IRequest): Promise<User> {
    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used.');
    }

    const user = UserRepository.create({
      name,
      email,
      password,
    });

    await UserRepository.save(user);

    return user;
  }

  public async index(): Promise<User[]> {
    const user = await UserRepository.find();

    return user;
  }
}

export default UserService;
