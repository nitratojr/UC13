import express, { Application } from 'express';
import { AppDataSource } from './database/data-source';
import userRoutes from './routes/UserRoutes';
import produtoRoutes from './routes/ProdutoRoutes';


AppDataSource.initialize()
    .then(() => {
        const app: Application = express();
        app.use(express.json());

        app.use('/api', userRoutes);
        app.use('/api', produtoRoutes);

        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));