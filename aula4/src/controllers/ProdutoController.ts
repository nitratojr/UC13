import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Produto } from '../models/Produto';

const userRepository = AppDataSource.getRepository(Produto);

export class ProdutoController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const produto = await userRepository.find();
        res.json(produto);
        return;
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { name, preco, descricao } = req.body;

        const produto = userRepository.create({ name, preco, descricao });
        await userRepository.save(produto);

         res.status(201).json(produto);
         return;
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await userRepository.findOneBy({ id: Number(id) });

        if (!produto) {
             res.status(404).json({ message: 'Produto não encontrado' });
             return;
        }

        res.json(produto);
        return;
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, preco, descricao } = req.body;

        const produto = await userRepository.findOneBy({ id: Number(id) });

        if (!produto) {
             res.status(404).json({ message: 'Produto não encontrado' });
             return;
        }

        produto.name = name;
        produto.preco= preco;
        produto.descricao = descricao;

        await userRepository.save(produto);

        res.json(produto);
        return;
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await userRepository.findOneBy({ id: Number(id) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }

        await userRepository.remove(produto);

        res.status(204).send();
        return;
    }
}