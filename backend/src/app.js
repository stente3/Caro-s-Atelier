import express from 'express';
import morgan from 'morgan';
import authRoutes from '../src/routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use('/api', authRoutes);
app.use(express.json());

export { app };
