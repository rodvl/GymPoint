import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);

routes.post('/student', StudentController.store);
routes.put('/student', StudentController.update);
routes.get('/student', StudentController.show);

export default routes;
