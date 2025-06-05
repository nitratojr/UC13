import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export class UserController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const users = await userRepository.find({
            select: {
                name: true,
                email: true,
                role: true, 
                phone: true
            }
        });
        res.json(users);
        return;
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { name, email, password, role, phone } = req.body; 
        const existEmail = await userRepository.findOneBy({ email });

        if (existEmail) {
            res.status(400).json({ message: 'Este email já existe' });
            return;
        }

        const user = userRepository.create({ name, email, password, role, phone }); 
        await userRepository.save(user);

        res.status(201).json(user);
        return;
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        res.json(user);
        return;
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password, role, phone } = req.body; 

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role; 
        user.phone = phone; 

        await userRepository.save(user);

        res.json(user);
        return;
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        await userRepository.remove(user);

        res.status(204).send();
        return;
    }
}
