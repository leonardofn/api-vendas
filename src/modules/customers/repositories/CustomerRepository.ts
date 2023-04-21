import { AppDataSource } from '@config/db.config';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICreateCustomer } from '../models/create-customer.model';
import { ICustomerRepository } from './../models/customer-repository.model';

class CustomerRepository implements ICustomerRepository {
  private customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = AppDataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.customerRepository.create({
      name,
      email,
    });

    await this.customerRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.customerRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<Customer> {
    await this.customerRepository.remove(customer);

    return customer;
  }

  public async find(): Promise<Customer[]> {
    const customer = await this.customerRepository.find();

    return customer;
  }

  public async findOneBy(id: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findOneBy({ id });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.name = :name', { name })
      .getOne();
  }

  public async findById(id: string): Promise<Customer | null> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .getOne();
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.email = :email', { email })
      .getOne();
  }
}

export default CustomerRepository;
