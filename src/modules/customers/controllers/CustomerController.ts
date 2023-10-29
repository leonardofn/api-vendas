import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CustomerService from '../services/CustomerService';

export default class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = container.resolve(CustomerService);
  }

  public index = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { page: pageReq, limit: limitReq } = request.query;
    const page = pageReq ? Number(pageReq) : 1;
    const limit = limitReq ? Number(limitReq) : 10;

    const customers = await this.customerService.index({ page, limit });

    return response.json(customers);
  };

  public show = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params;

    const showCustomer = await this.customerService.show(id);

    return response.json(instanceToInstance(showCustomer));
  };

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { name, email } = request.body;

    const customer = await this.customerService.create({
      name,
      email
    });

    return response.json(customer);
  };

  public update = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { name, email } = request.body;
    const { id } = request.params;

    const customer = await this.customerService.update({
      id,
      name,
      email
    });

    return response.json(customer);
  };

  public delete = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params;

    await this.customerService.delete(id);

    return response.json([]);
  };
}
