import { Router } from 'express';
import db from '../db.js';
import { z } from 'zod';

const router = Router();

const RegisterSchema = z.object({
  // Pflichtfelder
  district: z.string().trim().min(2, "Bitte wähle einen Bezirk aus").max(100),
  gremium: z.string().trim().min(2, "Gremium-Name ist zu kurz").max(100),
  contactPerson: z.string().trim().min(2, "Name der Ansprechperson ist zu kurz").max(100),
  
  // Zahlenfelder
  youthCount: z.number({ invalid_type_error: "Bitte eine Zahl angeben" }).min(0, "Ungültige Anzahl").max(10),
  adultCount: z.number({ invalid_type_error: "Bitte eine Zahl angeben" }).min(0, "Ungültige Anzahl").max(10),

  // Optionale E-Mail-Felder (Erlauben gültige E-Mail ODER leeren String)
  emailManagement: z.string().trim().email("Ungültige E-Mail-Adresse").or(z.literal('')),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").or(z.literal('')),

  // Namens-Arrays (Erlauben auch leere Arrays [])
  youthNames: z.array(z.string().trim()),
  adultNames: z.array(z.string().trim()),

  // Termine (Muss mindestens 1 Ausgewählter sein)
  selectedDates: z.array(z.string()).min(1, "Mindestens ein Termin muss ausgewählt werden"),

  // Optionale Notiz (Erlaubt leeren String ODER Text mit min. 2 Zeichen)
  notes: z.string().trim().max(500, "Notiz ist zu lang").or(z.literal('')),

  // Honeypot gegen Bots
  website_hp: z.string().optional()
});

router.post('/register', async (req, res) => {
  console.debug('Received registration request:', req.body);
  const data = req.body;

  try {
    // SCHRITT A: Honeypot-Prüfung (Bot-Abwehr)
    if (req.body.website_hp) {
      // Lautlos abbrechen: Bot denkt es war erfolgreich, Daten werden aber nicht gespeichert
      return res.status(200).json({ success: true, message: 'Registration successful!' });
    }

    // SCHRITT B: Zod-Validierung
    const result = RegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        error: 'Ungültige Eingaben', 
        details: result.error.format() 
      });
    }

    const { name, email, selectedDates } = result.data;

    // 1. Daten in PostgreSQL einfügen (Sichere Parameterized Query!)
    // Pass die Spaltennamen (name, email, etc.) an deine Postgres-Tabelle an
    const insertQuery = `
      INSERT INTO "lkjiv-registration" (district, gremium, contactPerson, emailManagement, email, youthCount, adultCount, youthNames, adultNames, selectedDates, notes) 
      VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *
    `;

    const insertValues = [data.district, data.gremium, data.contactPerson, data.emailManagement, data.email, data.youthCOunt, data.adultCount, data.youthNames, data.adultNames, data.selectedDates, data.notes];

    await db.query(insertQuery, insertValues);
    console.debug('Database insertion successful');

    // 2. Stimmen erhöhen (RPC-Funktion)
    if (data.selectedDates && data.selectedDates.length > 0) {
      await db.query('SELECT inc_date_votes($1)', [data.selectedDates]);
    }

    return res.status(200).json({ message: 'Registration successful!' });

  } catch (err) {
    console.error('Fehler bei der Registrierung:', err);
    // Gib dem Client keine rohen DB-Fehlermeldungen preis (Sicherheitsrisiko)
    return res.status(500).json({ error: 'Fehler beim Speichern der Registrierung' });
  }
});

export default router;