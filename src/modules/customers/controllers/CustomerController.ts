import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';

export default class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  public index = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const listCustomers = await this.customerService.index();

    return response.json(listCustomers);
  };

  public show = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { id } = request.params;

    const showCustomer = await this.customerService.show(id);

    return response.json(showCustomer);
  };

  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { name, email } = request.body;

    const customer = await this.customerService.create({
      name,
      email,
    });

    return response.json(customer);
  };

  public update = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { name, email } = request.body;
    const { id } = request.params;

    const customer = await this.customerService.update({
      id,
      name,
      email,
    });

    return response.json(customer);
  };

  public delete = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { id } = request.params;

    await this.customerService.delete(id);

    return response.json([]);
  };
}
