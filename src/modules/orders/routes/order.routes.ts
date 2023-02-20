import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.use(isAuthenticated);

orderRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().uuid().required(),
          quantity: Joi.number().required(),
        }),
      ),
    },
  }),
  orderController.create,
);

export default orderRouter;
