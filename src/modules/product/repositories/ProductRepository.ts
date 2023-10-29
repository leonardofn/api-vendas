import { In, Repository } from 'typeorm';
import { dataSource } from '../../../shared/infra/typeorm';
import Product from '../entities/Product';
import { ICreateProduct } from '../models/create-product.model';
import { IProductRepository } from '../models/product-repository.model';
import { IUpdateStockProduct } from '../models/update-stock-product.model';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    stock_quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, stock_quantity });

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

  public async findAllByIds(productsIds: string[]): Promise<Product[]> {
    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existentProducts;
  }
}

export default ProductRepository;
