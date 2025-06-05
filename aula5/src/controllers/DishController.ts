import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Dish } from '../models/Dish';

const dishRepository = AppDataSource.getRepository(Dish);

export class DishController {
    // Listar todos os pratos
    async list(req: Request, res: Response) {
        try {
            const dishes = await dishRepository.find({
                select: {
                    name: true,
                    description: true,
                    price: true,
                    available: true
                }
            });
            res.json(dishes);
        } catch (error) {
            console.error('Erro ao listar pratos:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Criar novo prato
    async create(req: Request, res: Response) {
        try {
            const { name, description, price, available } = req.body;

            if (!name || !description || price === undefined) {
                res.status(400).json({ message: 'Campos obrigatórios: name, description, price' });
                return;
            }

            const dish = dishRepository.create({
                name,
                description,
                price,
                available: available !== undefined ? available : true
            });

            await dishRepository.save(dish);

            res.status(201).json(dish);
        } catch (error) {
            console.error('Erro ao criar prato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Buscar prato por ID
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const dish = await dishRepository.findOneBy({ id: Number(id) });

            if (!dish) {
                res.status(404).json({ message: 'Prato não encontrado' });
                return;
            }

            res.json(dish);
        } catch (error) {
            console.error('Erro ao buscar prato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Atualizar prato
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, price, available } = req.body;

            const dish = await dishRepository.findOneBy({ id: Number(id) });

            if (!dish) {
                res.status(404).json({ message: 'Prato não encontrado' });
                return;
            }

            dish.name = name !== undefined ? name : dish.name;
            dish.description = description !== undefined ? description : dish.description;
            dish.price = price !== undefined ? price : dish.price;
            dish.available = available !== undefined ? available : dish.available;

            await dishRepository.save(dish);

            res.json(dish);
        } catch (error) {
            console.error('Erro ao atualizar prato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Deletar prato
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const dish = await dishRepository.findOneBy({ id: Number(id) });

            if (!dish) {
                res.status(404).json({ message: 'Prato não encontrado' });
                return;
            }

            await dishRepository.remove(dish);

            res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar prato:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
