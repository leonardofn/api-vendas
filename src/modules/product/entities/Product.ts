import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ColumnDecimalTransformer from '../../../shared/transformers/ColumnDecimalTransformer';
import OrdersProducts from '../../orders/entities/OrdersProducts';
import { IProduct } from '../models/product.model';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', {
    transformer: new ColumnDecimalTransformer(),
  })
  price: number;

  @Column('int')
  stock_quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];
}

export default Product;
