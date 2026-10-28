import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const here = path.dirname(fileURLToPath(import.meta.url));

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flexlearn',
  charset: 'utf8mb4',
  connectionLimit: 10,
  multipleStatements: false,
});

export async function migrate() {
  const sql = fs.readFileSync(path.join(here, 'schema.sql'), 'utf8');
  for (const stmt of sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean)) {
    await pool.query(stmt);
  }
}

export const parseJson = <T>(v: unknown): T =>
  (typeof v === 'string' ? JSON.parse(v) : v) as T;
