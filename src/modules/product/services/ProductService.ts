import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';
import { ProductRepository } from './../repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
  id?: string;
}

class ProductService {
  public async create({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists.length) {
      throw new AppError('There is already one product with is name.');
    }

    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await ProductRepository.save(product);

    return product;
  }

  public async index(): Promise<Product[]> {
    const products = await ProductRepository.find();

    return products;
  }

  public async findById({ id }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ProductService;
