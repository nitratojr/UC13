import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
const dataLog = (req: Request,res: Response, next: NextFunction) =>{
  console.log(`requisiçao feita em: ${new Date()}`);
  next();
  
}
app.use(dataLog);

const porteiroMiddleware = (req: Request, res: Response, next: Function) => {
  console.log(`📢 Requisição recebida em: ${req.url}`);
  next(); // Permite a requisição continuar para a rota
};

//app.use(porteiroMiddleware);

// 🔹 Rota GET (Buscar dados)
app.get('/usuarios', porteiroMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ mensagem: 'Lista de usuários' });
});
app.post('/sobre', (req: Request, res: Response) => {
  const { nome,idade,descricao } = req.body;
  res.status(200).json({ nome: nome, idade: idade, descricao: descricao });
});
app.post('/comentarios', (req: Request, res: Response) => {
  const { texto } = req.body;
  if (!texto) {
    res.status(400).json({ mensagem: "texto e obrigatório" })
    return;
    
  }
  res.status(201).json({ mensagem: "comentario recebido!" })
  return;
});

app.delete('/comentarios/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ mensagem: `comentario excluido!` })
  return;
});



// 🔹 Rota POST (Criar novo usuário)
app.post('/usuarios', (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) {
    res.status(400).json({ mensagem: 'Nome é obrigatório!' });
  }
  res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
});

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));