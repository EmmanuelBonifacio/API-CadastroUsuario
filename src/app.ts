import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

// Segurança  headers HTTP
app.use(helmet());

// CORS  permite acesso de frontends externos
app.use(
  cors({
    origin: process.env["ALLOWED_ORIGIN"] ?? "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Rate limit  máximo 100 requisições por IP a cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { erro: "Muitas requisições. Tente novamente em 15 minutos." },
});
app.use(limiter);

// Body parsing
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
