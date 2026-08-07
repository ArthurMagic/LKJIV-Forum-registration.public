import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const db = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_PUBLISHABLE_KEY
)

export default db;