import { AppDataSource } from '@config/db.config';
import Customer from '@modules/customers/entities/Customer';
import Order from '../entities/Order';

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

    if (!order) {
      return null;
    }

    order.order_products = await this.createQueryBuilder()
      .relation(Order, 'order_products')
      .of(order)
      .loadMany();

    order.customer = await this.createQueryBuilder()
      .relation(Order, 'customer')
      .of(order)
      .loadOne();

    return order;
  },

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    this.save(order);

    return order;
  },
});
