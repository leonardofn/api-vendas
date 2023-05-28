import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ColumnDecimalTransformer from '../../../shared/transformers/ColumnDecimalTransformer';
import Product from '../../product/entities/Product';
import { IOrderProducts } from '../models/order-products.model';
import Order from './Order';

@Entity('orders_products')
class OrdersProducts implements IOrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column('decimal', {
    transformer: new ColumnDecimalTransformer(),
  })
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default OrdersProducts;
