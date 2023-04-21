import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from '../../orders/entities/Order';
import { ICustomer } from '../models/customer.model';

@Entity('customers')
class Customer implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, order => order.customer, {
    cascade: true,
  })
  orders: Order[];
}

export default Customer;
