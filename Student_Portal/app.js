import express from "express";
import 'dotenv/config';
import cors from 'cors';
import studentRoutes from './routes/studentRoute.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN || '*' }));

app.use((req, res, next) => {
    console.log(`[Student Portal] ${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Student Portal is running!' });
});

app.use('/api/student', studentRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Student Portal listening on port ${port}...`);
});