import Customer from '@modules/customers/entities/Customer';
import { ICreateCustomer } from '@modules/customers/models/create-customer.model';
import {
  ICustomerRepository,
  SearchParams
} from '@modules/customers/models/customer-repository.model';
import { ICustomer } from '@modules/customers/models/customer.model';
import { v4 as uuidv4 } from 'uuid';
import { ICustomerPaginate } from '../../models/customer-paginate.model';

class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const { id } = customer;
    const customerIndex = this.customers.findIndex(
      customer => customer.id === id
    );

    this.customers[customerIndex] = customer;

    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer ?? null;
  }

  public async findByIdWithProducts(id: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer ?? null;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer ?? null;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer ?? null;
  }

  public async find({
    page,
    skip,
    take
  }: SearchParams): Promise<ICustomerPaginate> {
    return {
      perPage: take,
      total: this.customers.length,
      currentPage: page,
      data: this.customers.slice(skip, take)
    };
  }

  public async remove(customer: ICustomer): Promise<ICustomer> {
    const { id } = customer;
    const customerIndex = this.customers.findIndex(
      customer => customer.id === id
    );

    this.customers.splice(customerIndex, 1);

    return customer;
  }
}

export default FakeCustomersRepository;
