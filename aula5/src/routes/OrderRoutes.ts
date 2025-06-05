import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const routes = Router();
const orderController = new OrderController();

routes.get('/orders', orderController.list);
routes.post('/orders', orderController.create);
routes.get('/orders/:id', orderController.show);
routes.put('/orders/:id', orderController.updateStatus);
routes.delete('/orders/:id', orderController.delete);

export default routes;