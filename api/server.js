import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import healthRoutes from './routes/health.js';
import registerRoutes from './routes/register.js';
import dateRoutes from './routes/date.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', registerRoutes);
app.use('/api', dateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend läuft lokal auf http://127.0.0.1:${PORT}`);
});