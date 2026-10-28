import bcrypt from 'bcryptjs';
import { pool, migrate } from './db';
import { INITIAL_USERS, INITIAL_COURSES, INITIAL_PROGRESS, INITIAL_CERTIFICATES, INITIAL_NOTIFICATIONS, INITIAL_ANALYTICS } from '../src/data/initialData';
import { saveCourse, saveProgress, saveCertificate, saveNotification, saveNote, saveAnalytics, insertUser } from './repo';

const password = process.env.SEED_PASSWORD;
if (process.env.NODE_ENV === 'production' && !password) {
  console.error('Refusing to seed demo accounts in production without SEED_PASSWORD');
  process.exit(1);
}
const demoPassword = password || 'flexlearn123';

await migrate();
const [rows] = await pool.query('SELECT COUNT(*) AS n FROM users');
if ((rows as any[])[0].n > 0 && process.argv[2] !== '--force') {
  console.log('Database already has users; skipping (use --force to add missing seed rows).');
  process.exit(0);
}

const hash = await bcrypt.hash(demoPassword, 10);
for (const u of INITIAL_USERS) {
  const { notes, ...user } = u;
  await insertUser(user, hash);
  for (const n of notes || []) await saveNote(n);
}
for (const c of INITIAL_COURSES) await saveCourse(c);
for (const p of INITIAL_PROGRESS) await saveProgress(p);
for (const c of INITIAL_CERTIFICATES) await saveCertificate(c);
for (const n of INITIAL_NOTIFICATIONS) await saveNotification(n);
for (const a of INITIAL_ANALYTICS) await saveAnalytics(a);
console.log(`Seeded demo data. Demo accounts use password: ${demoPassword}`);
console.log(INITIAL_USERS.map(u => `  ${u.role.padEnd(8)} ${u.email}`).join('\n'));
await pool.end();
