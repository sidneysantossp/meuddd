import express from "express";
import { createApp } from "./server/_core/index";
import { serveStatic } from "./server/_core/vite";

// A Vercel identifica este ficheiro na raiz como a aplicação Node/Express.
// Não inicia uma porta: a plataforma invoca a aplicação exportada a cada pedido.
const app = express();
app.use(createApp());
serveStatic(app);

export default app;
