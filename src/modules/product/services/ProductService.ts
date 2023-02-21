import RedisCache from '@shared/cache/CacheRedis';
import { RedisKeys } from '@shared/cache/redis-keys';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Product from '../entities/Product';
import { ProductRepository } from './../repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
  id?: string;
}

class ProductService {
  private redisCache: RedisCache;

  constructor() {
    this.redisCache = new RedisCache();
  }

  public async create({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) {
      throw new AppError(
        'There is already one product with is name.',
        StatusCodes.CONFLICT,
      );
    }

    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await this.redisCache.invalidate(RedisKeys.PRODUCT_LIST);

    await ProductRepository.save(product);

    return product;
  }

  public async index(): Promise<Product[]> {
    const products =
      (await this.redisCache.recover<Product[]>(RedisKeys.PRODUCT_LIST)) ||
      (await ProductRepository.find());

    await this.redisCache.save<Product[]>(RedisKeys.PRODUCT_LIST, products);

    return products;
  }

  public async findById(id: string): Promise<Product> {
    const product = await ProductRepository.findOneBy({ id });

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
  }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }

    const productExists = await ProductRepository.findByName(name);

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

    await ProductRepository.save(product);

    return product;
  }

  public async delete(id: string): Promise<void> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }

    await this.redisCache.invalidate(RedisKeys.PRODUCT_LIST);

    await ProductRepository.remove(product);
  }
}

export default ProductService;
