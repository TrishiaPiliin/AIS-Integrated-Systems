import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[Adapter] ${req.method} ${req.path}`);
    next();
});

app.use('/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Adapter Layer is running!' });
});

try {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Adapter Layer listening on port ${process.env.PORT || 4000}...`);
    });
} catch (error) {
    console.log(error);
}