import { ICustomerRepository } from '@modules/customers/models/customer-repository.model';
import CustomerRepository from '@modules/customers/repositories/CustomerRepository';
import { IOrderRepository } from '@modules/orders/models/order-repository.model';
import OrderRepository from '@modules/orders/repositories/OrderRepository';
import { IProductRepository } from '@modules/product/models/product-repository.model';
import ProductRepository from '@modules/product/repositories/ProductRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
