import productRouter from '@modules/product/routes/product.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
