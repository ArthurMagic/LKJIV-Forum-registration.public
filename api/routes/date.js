import { Router } from 'express';
import db from '../db.js';

const router = Router();

function formatDate(dates) {
    const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

    return dates.map(d => {
        // node-postgres wandelt SQL-DATE/TIMESTAMP automatisch in ein JS Date-Objekt um
        const dateObject = new Date(d.date);

        return {
            ...d,
            id: d.date,
            date: dateObject.toLocaleDateString('de-DE'), // Format: "10.08.2026"
            weekday: weekdays[dateObject.getDay()],
            time: dateObject.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            }) // Format: "14:17"
        };
    });
}

router.get('/date', async (req, res) => {
    try {
        // 1. SQL-Abfrage ausführen
        const result = await db.query('SELECT * FROM dates');
        
        // 2. Zeilen aus dem Resultat-Objekt lesen
        const data = result.rows;

        // 3. Daten formatieren
        const formattedDates = formatDate(data);

        return res.status(200).json(formattedDates);

    } catch (error) {
        console.error('Error fetching dates:', error);
        return res.status(500).json({ error: 'Fehler beim Abrufen der Termine' });
    }
});

export default router;