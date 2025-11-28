import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon();
export const db = drizzle(sql);
