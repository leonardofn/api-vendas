import { ICustomerRepository } from '@modules/customers/models/customer-repository.model';
import CustomerRepository from '@modules/customers/repositories/CustomerRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
