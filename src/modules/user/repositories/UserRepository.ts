import { AppDataSource } from '@config/db.config';
import User from '../entitities/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.name = :name', { name })
      .getOne();
  },

  async findById(id: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  },

  async findByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  },
});
