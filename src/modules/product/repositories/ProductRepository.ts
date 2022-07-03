import { AppDataSource } from '@config/db.config';
import Product from '../entities/products';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product[]> {
    return this.createQueryBuilder('produc')
      .where('product.name = :name', { name })
      .getMany();
  },
});
