import { ICreateCustomer } from './create-customer.model';
import { ICustomer } from './customer.model';

export interface ICustomerRepository {
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<ICustomer>;
  find(): Promise<ICustomer[]>;
  findByIdWithProducts(id: string): Promise<ICustomer | null>;
  findOneBy(id: string): Promise<ICustomer | null>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
}
