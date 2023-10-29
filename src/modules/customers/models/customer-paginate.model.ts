import { ICustomer } from './customer.model';

export interface ICustomerPaginate {
  perPage: number;
  total: number;
  currentPage: number;
  data: ICustomer[];
}
