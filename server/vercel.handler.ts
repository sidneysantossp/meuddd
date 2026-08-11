import "dotenv/config";
import express from "express";
import { createApp, serveStatic } from "./_core/app";

/**
 * Entrada exclusiva de produção. Não importa o servidor de desenvolvimento
 * nem o grafo do Vite/Rollup, preservando a compatibilidade serverless.
 */
const app = express();
app.use(createApp());
serveStatic(app);

export default app;
