import express from 'express';
import productsRouter from './routers/products'
import { mongooseDB } from './config/db';
import authRouter from './routers/auth';

const app = express();

mongooseDB();

app.use(express.json());

app.use('/api', productsRouter);
app.use(`/api`, authRouter);

export const viteNodeApp = app;