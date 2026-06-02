import express, { Application, Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api/users", userRoutes);

// Rota raiz  so para confirmar que o servidor esta de pe
app.get("/", (req: Request, res: Response) => {
  res.json({ mensagem: "API de Cadastro de Usuários funcionando!" });
});

// Middleware de rota não encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Middleware de erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

export default app;
