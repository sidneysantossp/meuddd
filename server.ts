import express from "express";

// O handler compilado é a única aplicação carregada pela função Vercel. O
// import explícito de Express mantém a deteção automática da plataforma.
// @ts-expect-error O bundle gerado não expõe declarações TypeScript.
import productionHandler from "./dist/vercel/handler.js";

const app = express();
app.use(productionHandler);

export default app;
