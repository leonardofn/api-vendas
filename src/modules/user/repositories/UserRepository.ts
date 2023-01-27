import { AppDataSource } from '@config/db.config';
import User from '../entities/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.name = :name', { name })
      .getOne();
  },

  async findById(id: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.password')
      .getOne();
  },

  async findByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  },
});
