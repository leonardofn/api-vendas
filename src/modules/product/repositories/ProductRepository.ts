import { AppDataSource } from '@config/db.config';
import { In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { ICreateProduct } from '../models/create-product.model';
import { IProductId } from '../models/product-id.model';
import { IProductRepository } from '../models/product-repository.model';
import { IUpdateStockProduct } from '../models/update-stock-product.model';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findAllByIds(products: IProductId[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}

export default ProductRepository;
