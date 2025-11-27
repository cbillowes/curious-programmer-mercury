import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@netlify/neon';

const sql = neon();
export const db = drizzle(sql);
