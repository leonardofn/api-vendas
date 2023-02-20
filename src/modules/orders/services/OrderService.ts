import { CustomerRepository } from '@modules/customers/repositories/CustomerRepository';
import { OrdersRepository } from '@modules/orders/repositories/OrdersRepository';
import { ProductRepository } from '@modules/product/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Order from '../entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class OrderService {
  public async create({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await CustomerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError(
        'Could not find any customer with the given id.',
        StatusCodes.NOT_FOUND,
      );
    }
    const foundProducts = await ProductRepository.findAllByIds(products);

    if (foundProducts.length === 0) {
      throw new AppError(
        'Could not find any products with the given ids.',
        StatusCodes.NOT_FOUND,
      );
    }

    const foundProductsIds = foundProducts.map(products => products.id);

    const checkInexistentProducts = products.filter(
      product => !foundProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find any product ${checkInexistentProducts[0].id}.`,
        StatusCodes.NOT_FOUND,
      );
    }

    const quantityAvailable = products.filter(
      prodOrder =>
        foundProducts.filter(prodFound => prodFound.id === prodOrder.id)[0]
          .quantity < prodOrder.quantity,
    );

    if (quantityAvailable.length > 0) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for product ${quantityAvailable[0].id}`,
        StatusCodes.CONFLICT,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: foundProducts.find(p => p.id === product.id)?.price ?? 0,
    }));

    const order = await OrdersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        foundProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await ProductRepository.save(updatedProductQuantity);

    return order;
  }

  public async show(id: string) {
    const order = await OrdersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', StatusCodes.NOT_FOUND);
    }

    return order;
  }
}

export default OrderService;
