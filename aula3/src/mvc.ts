import express,{ Application } from "express"
import UsuarioRoutes from "./routes/UsuarioRoutes"
import ProdutoRoutes from "./routes/ProdutoRoutes"

const app: Application = express()

app.use(express.json());

//Rotas de aplicacao
app.use('/api',UsuarioRoutes)
app.use('/api',ProdutoRoutes)
app.listen(3000, () =>{
    console.log("Servidor rodando em http://localhost:3000")
});