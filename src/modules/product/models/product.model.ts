import { IOrderProducts } from '@modules/orders/models/order-products.model';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  order_products: IOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
