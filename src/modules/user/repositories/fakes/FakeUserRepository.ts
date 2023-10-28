import { ICreateUser } from '@modules/user/models/create-user.model';
import { IUserRepository } from '@modules/user/models/user-repository.model';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../models/user.model';

class FakeUserRepository implements IUserRepository {
  private users: IUser[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user: IUser = {
      id: uuidv4(),
      name,
      email,
      password,
      avatar: '',
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: () => null,
    };

    this.users.push(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(({ id }) => id === user.id);
    this.users[findIndex] = user;

    return user;
  }

  public async findAll(): Promise<IUser[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = this.users.find(user => user.name === name) ?? null;

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = this.users.find(user => user.id === id) ?? null;

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find(user => user.email === email) ?? null;

    return user;
  }
}

export default FakeUserRepository;
