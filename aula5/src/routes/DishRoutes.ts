import { Router } from 'express';

import { DishController } from '../controllers/DishController';

const routes = Router();
const disheController = new DishController();

routes.get('/dishes', disheController.list);
routes.post('/dishes', disheController.create);
routes.get('/dishes/:id', disheController.show);
routes.put('/dishes/:id', disheController.update);
routes.delete('/dishes/:id', disheController.delete);

export default routes;