import { IProduct } from '@modules/product/models/product.model';
import { IOrder } from './order.model';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
