import { ICustomerRepository } from '@modules/customers/models/customer-repository.model';
import { IProductRepository } from '@modules/product/models/product-repository.model';
import { IUpdateStockProduct } from '@modules/product/models/update-stock-product.model';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICreateOrderProducts } from '../models/create-order-products.model';
import { IOrderRepository } from '../models/order-repository.model';
import { IOrder } from '../models/order.model';
import { IRequestCreateOrder } from '../models/request-create-order.model';

@injectable()
class OrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async create({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError(
        'Could not find any customer with the given id.',
        StatusCodes.NOT_FOUND
      );
    }

    const productsIds = products.map(product => product.id);
    const foundProducts = await this.productRepository.findAllByIds(
      productsIds
    );

    if (foundProducts.length === 0) {
      throw new AppError(
        'Could not find any products with the given ids.',
        StatusCodes.NOT_FOUND
      );
    }

    const foundProductsIds = foundProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !foundProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find any product ${checkInexistentProducts[0].id}`,
        StatusCodes.NOT_FOUND
      );
    }

    const quantityAvailable = products.filter(
      prodOrder =>
        foundProducts.filter(prodFound => prodFound.id === prodOrder.id)[0]
          .stock_quantity < prodOrder.quantity
    );

    if (quantityAvailable.length > 0) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for product ${quantityAvailable[0].id}`,
        StatusCodes.CONFLICT
      );
    }

    const serializedProducts = products.map<ICreateOrderProducts>(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: foundProducts.find(p => p.id === product.id)?.price ?? -1,
    }));

    const order = await this.orderRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map<IUpdateStockProduct>(
      product => ({
        id: product.product_id,
        stock_quantity:
          foundProducts.filter(p => p.id === product.product_id)[0]
            .stock_quantity - product.quantity,
      })
    );

    await this.productRepository.updateStock(updatedProductQuantity);

    return order;
  }

  public async show(id: string): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', StatusCodes.NOT_FOUND);
    }

    return order;
  }
}

export default OrderService;
