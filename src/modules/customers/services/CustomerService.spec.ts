import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomerRepository';
import CustomerService from './CustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let customerService: CustomerService;

describe('CustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    customerService = new CustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await customerService.create({
      name: 'Leonardo Dev',
      email: 'leonardodev@test.com'
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create a two customer with the same email', async () => {
    await customerService.create({
      name: 'Leonardo Dev',
      email: 'leonardodev@test.com'
    });

    const newCustomer = customerService.create({
      name: 'Leonardo Dev',
      email: 'leonardodev@test.com'
    });

    expect(newCustomer).rejects.toBeInstanceOf(AppError);
  });
});
