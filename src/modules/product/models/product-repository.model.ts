import { ICreateProduct } from './create-product.model';
import { IProduct } from './product.model';
import { IUpdateStockProduct } from './update-stock-product.model';

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | null>;
  findById(id: string): Promise<IProduct | null>;
  findAll(): Promise<IProduct[]>;
  findAllByIds(productsIds: string[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
