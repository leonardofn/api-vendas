import productRouter from '@modules/product/routes/product.routes';
import passwordRouter from '@modules/user/routes/password.routes';
import userRouter from '@modules/user/routes/user.routes';
import { Router } from 'express';
import userAuthRouter from '../../../modules/user/routes/auth.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/auth', userAuthRouter);
routes.use('/password', passwordRouter);

export default routes;
