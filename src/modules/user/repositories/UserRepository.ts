import { AppDataSource } from '@config/db.config';
import { Repository } from 'typeorm';
import User from '../entities/User';
import { ICreateUser } from '../models/create-user.model';
import { IUserRepository } from '../models/user-repository.model';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ name });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }
}

export default UserRepository;
