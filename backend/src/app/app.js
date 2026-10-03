import express from 'express';
import path from 'node:path';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './api/routes/authRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
// const FRONTEND_PATH = path.join(import.meta.dirname, '..', '..', '..', 'frontend', 'dist');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(FRONTEND_PATH));
app.use(cookieParser())
app.use((req, res, next)=>{
    if(req.method == 'OPITIONS') {
        console.log(req.headers)
    }
    next()
})
app.use(cors({
    origin: `http://${process.env.HOST}:${process.env.PORT}`,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
app.use('/auth', authRouter);

export default app;