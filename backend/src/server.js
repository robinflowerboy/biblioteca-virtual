import 'dotenv/config';
import app from './app/app.js';

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Servidor ligado.\n${process.env.HOST}:${process.env.PORT}`);
});