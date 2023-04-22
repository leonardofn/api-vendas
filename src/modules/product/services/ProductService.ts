import RedisCache from '@shared/cache/CacheRedis';
import { RedisKeys } from '@shared/cache/redis-keys';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../models/create-product.model';
import { IProductId } from '../models/product-id.model';
import { IProductRepository } from '../models/product-repository.model';
import { IProduct } from '../models/product.model';
import { IUpdateProduct } from '../models/update-product.model';

@injectable()
class ProductService {
  private redisCache: RedisCache;

  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {
    this.redisCache = new RedisCache();
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError(
        'There is already one product with is name.',
        StatusCodes.CONFLICT,
      );
    }

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });

    await this.redisCache.invalidate(RedisKeys.PRODUCT_LIST);

    await this.productRepository.save(product);

    return product;
  }

  public async index(): Promise<IProduct[]> {
    let products = await this.redisCache.recover<IProduct[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productRepository.findAll();

      await this.redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }

  public async findById({ id }: IProductId): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }

    return product;
  }

  public async update({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }

    const productExists = await this.productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError(
        'There is already one product with is name.',
        StatusCodes.CONFLICT,
      );
    }

    await this.redisCache.invalidate(RedisKeys.PRODUCT_LIST);

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.save(product);

    return product;
  }

  public async delete({ id }: IProductId): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }

    await this.redisCache.invalidate(RedisKeys.PRODUCT_LIST);

    await this.productRepository.remove(product);
  }
}

export default ProductService;
