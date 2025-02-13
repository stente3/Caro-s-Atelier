import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import imageRoutes from './routes/imageRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/images', imageRoutes);
app.use('/data', dataRoutes);

// Error Handler
app.use(errorHandler);

export default app;

