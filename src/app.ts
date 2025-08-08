import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3001',
        credentials: true,
    })
);

app.use('/api/v1', router);
app.get('/api/test', (_req, res) => {
    res.send("<h3>Application running!!!</h3>")
})

app.get('/cookie', (req, res) => {
    console.log('Cookies:', req.cookies);
    res.json(req.cookies);
});

app.use(notFoundHandler)
app.use(errorHandler)

export default app;
