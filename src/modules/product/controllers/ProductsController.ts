import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

export default class ProductsController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = await this.productService.index();

    return response.json(listProducts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = await this.productService.findById(id);

    return response.json(showProduct);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const product = await this.productService.create({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const product = await this.productService.update({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.productService.delete(id);

    return response.json([]);
  }
}
