import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import app from "./app";
import connectDB from "./config/database";

const PORT = process.env["PORT"] ?? 3000;

const iniciarServidor = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

iniciarServidor();
