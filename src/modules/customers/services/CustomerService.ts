import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Customer from '../entities/Customer';
import { CustomerRepository } from '../repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

interface IRequestUpdate extends IRequest {
  id: string;
}

class CustomerService {
  public async create({ name, email }: IRequest): Promise<Customer> {
    const customerEmailExists = await CustomerRepository.findByEmail(email);

    if (customerEmailExists) {
      throw new AppError(
        'There is already one customer with is email.',
        StatusCodes.CONFLICT,
      );
    }

    const customer = CustomerRepository.create({
      name,
      email,
    });

    await CustomerRepository.save(customer);

    return customer;
  }

  public async index(): Promise<Customer[]> {
    const customer = await CustomerRepository.find();

    return customer;
  }

  public async show(id: string): Promise<Customer> {
    const customer = await CustomerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    return customer;
  }

  public async update({ id, name, email }: IRequestUpdate): Promise<Customer> {
    const customer = await CustomerRepository.findOneBy({ id });

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    const customerExists = await CustomerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError(
        'There is already one customer with is email.',
        StatusCodes.CONFLICT,
      );
    }

    customer.name = name;
    customer.email = email;

    await CustomerRepository.save(customer);

    return customer;
  }

  public async delete(id: string): Promise<void> {
    const customer = await CustomerRepository.findOneBy({ id });

    if (!customer) {
      throw new AppError('Customer not found.', StatusCodes.NOT_FOUND);
    }

    await CustomerRepository.remove(customer);
  }
}

export default CustomerService;
