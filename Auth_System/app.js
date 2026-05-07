import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRoutes from './routes/UserRoutes.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: 'Auth System API is running!' });
});

app.use('/user', userRoutes);

export default app;