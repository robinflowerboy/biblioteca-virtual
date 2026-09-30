import express from 'express';
import path from 'node:path';

const app = express();
const FRONTEND_PATH = path.join(import.meta.dirname, '..', '..', '..', 'frontend', 'dist');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(FRONTEND_PATH));

app.get('/', (res, req) => {
    res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
});

export default app;