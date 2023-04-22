import { IProduct } from '@modules/product/models/product.model';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}
