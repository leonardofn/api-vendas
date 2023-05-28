export interface IRequestCreateOrder {
  customer_id: string;
  products: {
    id: string;
    quantity: number;
  }[];
}
