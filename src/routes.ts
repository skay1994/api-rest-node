import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { authMiddleware } from './app/middlewares/authMiddleware';
import AuthController from './app/modules/auth/controllers/AuthController';
import UserController from './app/modules/users/controllers/UserController';

const routes = Router();

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.store,
);

routes.get(
  '/users/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authMiddleware,
  UserController.show,
);

routes.patch(
  '/users/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authMiddleware,
  UserController.update,
);

routes.delete(
  '/users/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authMiddleware,
  UserController.delete,
);

routes.post(
  '/users/auth',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  AuthController.login,
);

export { routes };
