import { ICreateOrder } from './create-order.model';
import { IOrder } from './order.model';

export interface IOrderRepository {
  create(order: ICreateOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
}
