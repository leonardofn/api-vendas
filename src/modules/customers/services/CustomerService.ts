import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../models/create-customer.model';
import { ICustomerPaginate } from '../models/customer-paginate.model';
import { ICustomerRepository } from '../models/customer-repository.model';
import { ICustomer } from '../models/customer.model';
import { IUpdateCustomer } from '../models/update-customer.model';

interface ISearchParams {
  page: number;
  limit: number;
}

@injectable()
class CustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customerEmailExists = await this.customerRepository.findByEmail(
      email
    );

    if (customerEmailExists) {
      throw new AppError(
        'There is already one customer with is email.',
        StatusCodes.CONFLICT
      );
    }

    const customer = await this.customerRepository.create({
      name,
      email
    });

    return customer;
  }

  public async index({
    page,
    limit
  }: ISearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (page - 1) * take;

    const customers = await this.customerRepository.find({ page, skip, take });

    return customers;
  }

  public async show(id: string): Promise<ICustomer | null> {
    const customer = await this.customerRepository.findByIdWithProducts(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    return customer;
  }

  public async update({
    id,
    name,
    email
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError(
        'There is already one customer with is email.',
        StatusCodes.CONFLICT
      );
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }

  public async delete(id: string): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    await this.customerRepository.remove(customer);
  }
}

export default CustomerService;
