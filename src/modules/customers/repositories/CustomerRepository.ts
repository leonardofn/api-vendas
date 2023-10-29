import { Repository } from 'typeorm';
import { dataSource } from '../../../shared/infra/typeorm';
import Customer from '../entities/Customer';
import { ICreateCustomer } from '../models/create-customer.model';
import { ICustomerPaginate } from '../models/customer-paginate.model';
import {
  ICustomerRepository,
  SearchParams
} from './../models/customer-repository.model';

class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<Customer> {
    await this.ormRepository.remove(customer);

    return customer;
  }

  public async find({
    page,
    skip,
    take
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result: ICustomerPaginate = {
      perPage: take,
      total: count,
      currentPage: page,
      data: customers
    };

    return result;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = this.ormRepository.findOneBy({ id });

    return customer;
  }

  public async findByIdWithProducts(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      relations: ['orders.order_products.product'],
      where: {
        id
      },
      order: {
        created_at: 'DESC'
      }
    });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.ormRepository.findOneBy({ name });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.ormRepository.findOneBy({ email });

    return customer;
  }
}

export default CustomerRepository;
