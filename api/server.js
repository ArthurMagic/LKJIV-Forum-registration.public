import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import healthRoutes from './routes/health.js';
import registerRoutes from './routes/register.js';
import dateRoutes from './routes/date.js';

dotenv.config();

const app = express();
// 1. GLOBALE MIDDLEWARES (Müssen VOR allen Routen stehen)
app.use(helmet());

app.use(cors({ 
  origin: 'https://lkjiv-forum.noip.at' // NUR deine Frontend-Domain erlauben
}));

// Payload-Größe beschränken (Schutz vor DoS)
app.use(express.json({ limit: '10kb' }));

// 2. RATE LIMITER FÜR DIE REGISTRIERUNG DEFINIEREN
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Stunde Zeitfenster
  max: 5, // Maximal 5 Anmeldungen pro IP pro Stunde
  message: { error: 'Zu viele Anmeldungen von dieser IP-Adresse. Bitte später erneut versuchen.' }
});

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/register', registerLimiter, registerRoutes);
app.use('/api', dateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend läuft lokal auf http://127.0.0.1:${PORT}`);
});