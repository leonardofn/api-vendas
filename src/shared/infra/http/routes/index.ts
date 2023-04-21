import customerRouter from '@modules/customers/routes/customers.routes';
import orderRouter from '@modules/orders/routes/order.routes';
import productRouter from '@modules/product/routes/product.routes';
import userAuthRouter from '@modules/user/routes/auth.routes';
import passwordRouter from '@modules/user/routes/password.routes';
import profileRouter from '@modules/user/routes/profile.routes';
import userRouter from '@modules/user/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/auth', userAuthRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);

export default routes;
