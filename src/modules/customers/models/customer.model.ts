import { IOrder } from '@modules/orders/models/order.model';

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  orders: IOrder[];
}
