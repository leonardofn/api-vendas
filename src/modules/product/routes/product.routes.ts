import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.index);

productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.show
);

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      stock_quantity: Joi.number().required(),
    },
  }),
  productController.create
);

productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      stock_quantity: Joi.number().required(),
    },
  }),
  productController.update
);

productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete
);

export default productRouter;
