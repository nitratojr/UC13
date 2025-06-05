import { Router } from 'express';
import {ProdutoController} from '../controllers/ProdutoController';

const routes = Router();
const produtoController = new ProdutoController();

routes.get('/Produtos', produtoController.list);
routes.post('/Produtos', produtoController.create);
routes.get('/Produtos/:id', produtoController.show);
routes.put('/Produtos/:id', produtoController.update);
routes.delete('/Produtos/:id', produtoController.delete);

export default routes;