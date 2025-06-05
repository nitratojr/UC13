import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

routes.get('/user', userController.list);
routes.post('/user', userController.create);
routes.get('/user/:id', userController.show);
routes.put('/user/:id', userController.update);
routes.delete('/user/:id', userController.delete);

export default routes;