import { ICreateCustomer } from './create-customer.model';
import { ICustomerPaginate } from './customer-paginate.model';
import { ICustomer } from './customer.model';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomerRepository {
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<ICustomer>;
  find(searchParams: SearchParams): Promise<ICustomerPaginate>;
  findById(id: string): Promise<ICustomer | null>;
  findByIdWithProducts(id: string): Promise<ICustomer | null>;
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
}
