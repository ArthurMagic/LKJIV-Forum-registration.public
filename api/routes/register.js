import { Router } from 'express';

const router = Router();

import db from '../db.js';

router.post('/register', async (req, res) => {
    console.debug('Received registration request:', req.body);
    const data = req.body;
    if (req.method === 'POST') {
        console.debug('Inserting registration data into the database:', data);
        try {
            const { error: errorDB } = await db
                .from('lkjiv-registration')
                .insert(data);

            if (errorDB) {
                throw errorDB;
            }

            console.debug('Database insertion successfull', errorDB);
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }

        try {
            console.debug('Voting reached', data.selectedDates);
            const { error: voteError } = await db
                .rpc('inc_date_votes', { option_ids: data.selectedDates });
            if(voteError){
                throw voteError;
            }
            console.debug('Voting Function sucessfull');
        }
        catch (err) {
            console.error("Database voteError", err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ message: 'Registration sucessfull!' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
})

export default router;