import { Router } from 'express';
import db from '../db.js';

const router = Router();

function formatDate(dates) {
    const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

    return dates.map(d => {
        const dateObject = new Date(d.date);

        return {
            ...d,
            id: d.date,
            date: dateObject.toLocaleDateString('de-DE').split('T')[0],
            weekday: weekdays[dateObject.getDay()],
        };
    });
}

router.get('/date', async (req, res) => {
    try {
        const { data, error } = await db
            .from('dates')
            .select('*');

        if (error) {
            throw error;
        }

        const formattedDates = formatDate(data);

       return res.status(200).json(formattedDates);

    } catch (error) {
        console.error('Error fetching dates:', error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;