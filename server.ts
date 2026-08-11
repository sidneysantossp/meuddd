import express from "express";

// O comando build:vercel gera este módulo antes de a Vercel empacotar a função.
// A importação estática permite que o file tracer inclua as dependências externas
// do bundle, em vez de tentar resolver os ficheiros TypeScript do projeto em /var/task.
// @ts-expect-error O bundle gerado não expõe declarações TypeScript.
import { createApp, serveStatic } from "./dist/index.js";

// A Vercel identifica este ficheiro na raiz como a aplicação Node/Express.
// Não inicia uma porta: a plataforma invoca a aplicação exportada a cada pedido.
const app = express();
app.use(createApp());
serveStatic(app);

export default app;
