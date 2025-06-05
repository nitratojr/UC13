import express, { Application, Request, Response } from "express";

const app: Application = express(); 

app.get('/', (req: Request, res: Response) => {
    res.send("<h1>TESTE</h1>")
});

app.listen(3000, ()=> {
    console.log("rodando")
});

app.get('/nome', (req: Request,res: Response) => {
    res.send('<h1>Eu sou o batman<h1>')
})