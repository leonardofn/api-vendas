import { AppDataSource } from '@config/db.config';
import Product from '../entities/Product';

interface IProductId {
  id: string;
}

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.createQueryBuilder('product')
      .where('product.name = :name', { name })
      .getOne();
  },

  async findAllByIds(products: IProductId[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    return this.createQueryBuilder('product')
      .where('product.id IN (:...productIds)', { productIds })
      .getMany();
  },
});
