import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';
import { ProductRepository } from './../repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
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
}

export default ProductService;
