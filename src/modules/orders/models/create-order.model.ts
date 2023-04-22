import { ICustomer } from '@modules/customers/models/customer.model';
import { ICreateOrderProducts } from './create-order-products.model';

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}
