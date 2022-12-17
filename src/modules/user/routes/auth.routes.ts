import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import UserAuthController from '../controllers/UserAuthController';

const userAuthRouter = Router();
const userAuthController = new UserAuthController();

userAuthRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userAuthController.execute,
);

export default userAuthRouter;
