import { ICustomer } from '@modules/customers/models/customer.model';
import { ICreateOrderProducts } from './create-order-products.model';

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
