import { AppDataSource } from '@config/db.config';
import Product from '../entities/Product';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.createQueryBuilder('product')
      .where('product.name = :name', { name })
      .getOne();
  },
});
