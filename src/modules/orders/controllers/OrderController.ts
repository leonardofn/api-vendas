import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import OrderService from '../services/OrderService';

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = container.resolve(OrderService);
  }

  public show = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params;

    const order = await this.orderService.show(id);

    return response.json(instanceToInstance(order));
  };

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { customer_id, products } = request.body;

    const order = await this.orderService.create({ customer_id, products });

    return response.json(instanceToInstance(order));
  };
}
