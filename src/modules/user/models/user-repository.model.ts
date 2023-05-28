import { ICreateUser } from './create-user.model';
import { IUser } from './user.model';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
