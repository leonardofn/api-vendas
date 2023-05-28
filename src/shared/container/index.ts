import { ICustomerRepository } from '@modules/customers/models/customer-repository.model';
import CustomerRepository from '@modules/customers/repositories/CustomerRepository';
import { IOrderRepository } from '@modules/orders/models/order-repository.model';
import OrderRepository from '@modules/orders/repositories/OrderRepository';
import { IProductRepository } from '@modules/product/models/product-repository.model';
import ProductRepository from '@modules/product/repositories/ProductRepository';
import { IUserRepository } from '@modules/user/models/user-repository.model';
import { IUserTokensRepository } from '@modules/user/models/user-tokens-repository.model';
import UserRepository from '@modules/user/repositories/UserRepository';
import UserTokensRepository from '@modules/user/repositories/UserTokenRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);
