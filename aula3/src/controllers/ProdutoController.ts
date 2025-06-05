import { Request, Response } from "express";
import { Produtos, produto } from "../models/Produtos";


// Criar um novo usuário
export const criarProduto = (req: Request, res: Response) => {
  const { id, nome, preco} = req.body;
  if (!id || !nome || !preco) {
    res.status(400).json({ mensagem: "Preencha todos os campos!" });
    return;
  }

  const novoProduto = new Produtos(id, nome, preco);
  produto.push(novoProduto);
  res.status(201).json({ mensagem: "Usuário criado com sucesso!", produto: novoProduto });
  return;
};

// Listar todos os usuários
export const listarProdutos = (req: Request, res: Response) => {
  res.status(200).json(produto);
  return;
};

// Buscar um usuário por ID
export const buscarProdutoPorId = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const produtos = produto.find((u) => u.id === id);
  if (!produtos) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(produtos);
  return;
};

// Atualizar um Produto
export const atualizarProduto = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;

  if (!id ) {
    res.status(400).json({ mensagem: " ID é obrigatório!" });
    return;
    
  }
  if (!nome && !preco) {
    res.status(400).json({ mensagem: "Preencha pelo menos um campo!" });
    return;
    
  }
  const produtos = produto.find((u) => u.id === id);

  if (!produtos){
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }
 

  produtos.nome = nome || produtos.nome;
  produtos.preco = preco || produtos.preco;
  res.status(200).json({ mensagem: "atualizado com sucesso!", produtos });
};

// Deletar Produto
export const deletarProduto = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id ) {
    res.status(400).json({ mensagem: " ID é obrigatório!" });
    return;
    
  }
  const index = produto.findIndex((u) => u.id === id);
  if (index === -1){
     res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }
    

  produto.splice(index, 1);
  res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
  return;
};

