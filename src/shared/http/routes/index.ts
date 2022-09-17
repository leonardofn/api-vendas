import { Router } from 'express';
import productsRouter from '@modules/product/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
