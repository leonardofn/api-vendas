import { AppDataSource } from '@config/db.config';
import Customer from '../../customers/entities/Customer';
import Order from '../entities/Order';
import OrdersProducts from '../entities/OrdersProducts';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export const OrdersRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await AppDataSource.manager.findOneBy(Order, {
      id,
    });

    if (!order) return null;

    const customer = await this.createQueryBuilder()
      .relation(Order, 'customer')
      .of(order)
      .loadOne<Customer>();

    const orderProducts = await this.createQueryBuilder()
      .relation(Order, 'order_products')
      .of(order)
      .loadMany<OrdersProducts>();

    order.customer = customer as Customer;
    order.order_products = orderProducts;

    return order;
  },

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  },
});
