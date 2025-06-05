import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Order } from '../models/Order';



const orderRepository = AppDataSource.getRepository(Order);

export class OrderController {
    // Listar todos os pedidos
    async list(req: Request, res: Response) {
        try {
            const orders = await orderRepository.find({
                relations: ['user'],
                select: {
                    id: true,
                    status: true,
                    createdAt: true,                  
                    user: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            });
            res.json(orders);
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Criar novo pedido
    async create(req: Request, res: Response) {
        try {
            const { userId } = req.body;

            if (!userId) {
                res.status(400).json({ message: 'O campo userId é obrigatório' });
                return;
            }

            const user = { id: userId } as any;

            const order = orderRepository.create({
                user,
                status: 'pending'
            });
            await orderRepository.save(order);

            res.status(201).json(order);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Buscar pedido por ID
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await orderRepository.findOne({
                where: { id: Number(id) },
                relations: ['user']
            });

            if (!order) {
                res.status(404).json({ message: 'Pedido não encontrado' });
                return;
            }

            res.json(order);
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Atualizar status do pedido
    async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                res.status(400).json({ message: 'O campo status é obrigatório' });
                return;
            }

            const order = await orderRepository.findOneBy({ id: Number(id) });

            if (!order) {
                res.status(404).json({ message: 'Pedido não encontrado' });
                return;
            }

            order.status = status;

            await orderRepository.save(order);

            res.json(order);
        } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Deletar pedido
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await orderRepository.findOneBy({ id: Number(id) });

            if (!order) {
                res.status(404).json({ message: 'Pedido não encontrado' });
                return;
            }

            await orderRepository.remove(order);

            res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}


