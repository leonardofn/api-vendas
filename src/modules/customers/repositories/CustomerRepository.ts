import { AppDataSource } from '@config/db.config';
import Customer from '../entities/Customer';

export const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    return this.createQueryBuilder('customer')
      .where('customer.name = :name', { name })
      .getOne();
  },

  async findById(id: string): Promise<Customer | null> {
    return this.createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .getOne();
  },

  async findByEmail(email: string): Promise<Customer | null> {
    return this.createQueryBuilder('customer')
      .where('customer.email = :email', { email })
      .getOne();
  },
});
