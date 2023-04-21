import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Customer from '../entities/Customer';
import CustomerRepository from '../repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

interface IRequestUpdate extends IRequest {
  id: string;
}

class CustomerService {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async create({ name, email }: IRequest): Promise<Customer> {
    const customerEmailExists = await this.customerRepository.findByEmail(
      email,
    );

    if (customerEmailExists) {
      throw new AppError(
        'There is already one customer with is email.',
        StatusCodes.CONFLICT,
      );
    }

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    await this.customerRepository.save(customer);

    return customer;
  }

  public async index(): Promise<Customer[]> {
    const customer = await this.customerRepository.find();

    return customer;
  }

  public async show(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    return customer;
  }

  public async update({ id, name, email }: IRequestUpdate): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError(
        'There is already one customer with is email.',
        StatusCodes.CONFLICT,
      );
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }

  public async delete(id: string): Promise<void> {
    const customer = await this.customerRepository.findOneBy(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    await this.customerRepository.remove(customer);
  }
}

export default CustomerService;
