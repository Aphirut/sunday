import express, { type NextFunction, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import 'dotenv/config';
import { migrate } from './db';
import * as repo from './repo';
import type { Course, UserCourseProgress, Certificate, EmailNotification, UserNote, CourseAnalytics, AppSettings, User } from '../src/types';

const isProd = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET || (isProd ? '' : 'dev-only-secret-change-me');
if (!JWT_SECRET) throw new Error('JWT_SECRET must be set in production');

type AuthUser = { id: string; email: string; role: 'admin' | 'teacher' | 'student' };
type AuthedRequest = Request & { auth: AuthUser };

const app = express();
app.use(express.json({ limit: '25mb' }));

const wrap = (fn: (req: AuthedRequest, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => fn(req as AuthedRequest, res).catch(next);

const signToken = (u: AuthUser) => jwt.sign(u, JWT_SECRET, { expiresIn: '7d' });

// Very small in-memory rate limit for credential endpoints
const attempts = new Map<string, { n: number; reset: number }>();
const limitAuth = (req: Request, res: Response, next: NextFunction) => {
  const key = req.ip || 'x';
  const now = Date.now();
  const a = attempts.get(key);
  if (!a || a.reset < now) attempts.set(key, { n: 1, reset: now + 15 * 60_000 });
  else if (++a.n > 30) return res.status(429).json({ error: 'พยายามบ่อยเกินไป กรุณาลองใหม่ภายหลัง' });
  next();
};

// Re-reads the user from the DB so role changes/deletions take effect immediately.
const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || '';
  let id: string;
  try {
    id = (jwt.verify(header.replace(/^Bearer /, ''), JWT_SECRET) as AuthUser).id;
  } catch {
    return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' });
  }
  repo.getUserById(id).then(row => {
    if (!row) return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' });
    (req as AuthedRequest).auth = { id: row.id, email: row.email, role: row.role };
    next();
  }).catch(next);
};

const staff = (u: AuthUser) => u.role === 'admin' || u.role === 'teacher';
const forbid = (res: Response) => res.status(403).json({ error: 'ไม่มีสิทธิ์ดำเนินการ' });

// ---------- Auth ----------
const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(200),
});
app.post('/api/auth/register', limitAuth, wrap(async (req, res) => {
  const p = registerSchema.safeParse(req.body);
  if (!p.success) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง (รหัสผ่านอย่างน้อย 8 ตัวอักษร)' });
  if (await repo.getUserByEmail(p.data.email)) return res.status(409).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
  const id = `user-${crypto.randomUUID()}`;
  await repo.insertUser({
    id, name: p.data.name, email: p.data.email,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.data.name)}`,
    role: 'student', createdAt: new Date().toISOString().slice(0, 10), enrolledCourseIds: [],
  }, await bcrypt.hash(p.data.password, 10));
  res.json({ token: signToken({ id, email: p.data.email.toLowerCase(), role: 'student' }) });
}));

app.post('/api/auth/login', limitAuth, wrap(async (req, res) => {
  const p = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(req.body);
  const row = p.success ? await repo.getUserByEmail(p.data.email) : undefined;
  const ok = row && p.success && await bcrypt.compare(p.data.password, row.password_hash);
  if (!row || !ok) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  res.json({ token: signToken({ id: row.id, email: row.email, role: row.role }) });
}));

// ---------- Bootstrap ----------
app.get('/api/bootstrap', auth, wrap(async (req, res) => {
  const me = req.auth;
  const [users, courses, progress, certificates, notifications, analytics, settings] = await Promise.all([
    staff(me) ? repo.listUsers() : repo.listUsers(me.id),
    repo.listCourses(me), repo.listProgress(me), repo.listCertificates(me),
    repo.listNotifications(me), repo.listAnalytics(), repo.getSettings(),
  ]);
  const notes = await repo.listNotes([me.id]);
  res.json({
    currentUserId: me.id,
    users: users.map(u => ({ ...u, notes: notes.filter(n => n.userId === u.id) })),
    courses, progress, certificates, notifications, analytics, settings,
  });
}));

// ---------- Users ----------
app.post('/api/users', auth, wrap(async (req, res) => {
  if (req.auth.role !== 'admin') return forbid(res);
  const p = registerSchema.extend({
    role: z.enum(['admin', 'teacher', 'student']).default('student'),
    enrolledCourseIds: z.array(z.string()).optional(),
    id: z.string().regex(/^[\w-]{1,64}$/).optional(),
    avatar: z.string().optional(), department: z.string().optional(), phone: z.string().optional(),
  }).safeParse(req.body);
  if (!p.success) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  if (await repo.getUserByEmail(p.data.email)) return res.status(409).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
  const id = p.data.id || `user-${crypto.randomUUID()}`;
  await repo.insertUser({
    id, name: p.data.name, email: p.data.email, role: p.data.role,
    avatar: p.data.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.data.name)}`,
    department: p.data.department, phone: p.data.phone,
    createdAt: new Date().toISOString().slice(0, 10), enrolledCourseIds: p.data.enrolledCourseIds || [],
  }, await bcrypt.hash(p.data.password, 10));
  res.json({ id });
}));

app.put('/api/users/:id', auth, wrap(async (req, res) => {
  const isSelf = req.params.id === req.auth.id;
  if (!isSelf && req.auth.role !== 'admin') return forbid(res);
  const existing = await repo.getUserById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
  const b = req.body as User;
  await repo.updateUserProfile({ ...repo.toUser(existing), ...b, id: existing.id, email: existing.email, createdAt: existing.created_at },
    req.auth.role === 'admin' && !!b.role);
  res.json({ ok: true });
}));

app.delete('/api/users/:id', auth, wrap(async (req, res) => {
  if (req.auth.role !== 'admin' || req.params.id === req.auth.id) return forbid(res);
  await repo.deleteUser(req.params.id);
  res.json({ ok: true });
}));

// ---------- Courses ----------
app.put('/api/courses/:id', auth, wrap(async (req, res) => {
  if (!staff(req.auth)) return forbid(res);
  const course = req.body as Course;
  if (course?.id !== req.params.id) return res.status(400).json({ error: 'id ไม่ตรงกัน' });
  const existing = await repo.getCourseRow(course.id);
  if (existing && req.auth.role !== 'admin' && existing.created_by_id !== req.auth.id) return forbid(res);
  // Preserve the original owner; new courses are owned by their creator.
  const owner = existing ? existing.created_by_id : req.auth.id;
  await repo.saveCourse({ ...course, createdById: owner ?? undefined });
  res.json({ ok: true });
}));

app.delete('/api/courses/:id', auth, wrap(async (req, res) => {
  const existing = await repo.getCourseRow(req.params.id);
  if (!existing) return res.json({ ok: true });
  if (req.auth.role !== 'admin' && !(req.auth.role === 'teacher' && existing.created_by_id === req.auth.id)) return forbid(res);
  await repo.deleteCourse(req.params.id);
  res.json({ ok: true });
}));

// Students join a classroom by code without being able to read unpublished courses.
app.post('/api/classroom/lookup', auth, wrap(async (req, res) => {
  const code = String(req.body?.code || '').trim().toLowerCase();
  const all = await repo.listCourses({ id: '', role: 'admin' });
  const hit = all.find(c => c.classroomCode?.toLowerCase() === code && c.isClassroomOpen !== false);
  res.json({ course: hit || null });
}));

// ---------- Progress / certificates / notes / notifications ----------
const canManageCourse = async (u: AuthUser, courseId: string) => {
  if (u.role === 'admin') return true;
  if (u.role !== 'teacher') return false;
  return (await repo.getCourseRow(courseId))?.created_by_id === u.id;
};

app.put('/api/progress/:courseId/:userId', auth, wrap(async (req, res) => {
  const { courseId, userId } = req.params;
  const p = req.body as UserCourseProgress;
  if (p?.courseId !== courseId || p?.userId !== userId) return res.status(400).json({ error: 'ข้อมูลไม่ตรงกัน' });
  if (userId !== req.auth.id && !(await canManageCourse(req.auth, courseId))) return forbid(res);
  await repo.saveProgress(p);
  res.json({ ok: true });
}));

app.put('/api/certificates/:id', auth, wrap(async (req, res) => {
  const c = req.body as Certificate;
  if (c?.id !== req.params.id) return res.status(400).json({ error: 'id ไม่ตรงกัน' });
  if (c.userId !== req.auth.id && !(await canManageCourse(req.auth, c.courseId))) return forbid(res);
  await repo.saveCertificate(c);
  res.json({ ok: true });
}));

app.put('/api/notifications/:id', auth, wrap(async (req, res) => {
  const n = req.body as EmailNotification;
  if (n?.id !== req.params.id) return res.status(400).json({ error: 'id ไม่ตรงกัน' });
  const owner = await repo.getNotificationEmail(n.id);
  if (owner && owner !== req.auth.email.toLowerCase() && req.auth.role !== 'admin') return forbid(res);
  await repo.saveNotification(owner ? { ...n, toEmail: owner } : n);
  res.json({ ok: true });
}));

app.put('/api/notes/:id', auth, wrap(async (req, res) => {
  const n = req.body as UserNote;
  if (n?.id !== req.params.id || n.userId !== req.auth.id) return forbid(res);
  const owner = await repo.getNoteOwner(n.id);
  if (owner && owner !== req.auth.id) return forbid(res);
  await repo.saveNote(n);
  res.json({ ok: true });
}));

app.delete('/api/notes/:id', auth, wrap(async (req, res) => {
  const owner = await repo.getNoteOwner(req.params.id);
  if (owner && owner !== req.auth.id && req.auth.role !== 'admin') return forbid(res);
  await repo.deleteNote(req.params.id);
  res.json({ ok: true });
}));

app.put('/api/analytics/:courseId', auth, wrap(async (req, res) => {
  const a = req.body as CourseAnalytics;
  if (a?.courseId !== req.params.courseId) return res.status(400).json({ error: 'id ไม่ตรงกัน' });
  if (!staff(req.auth)) return forbid(res);
  await repo.saveAnalytics(a);
  res.json({ ok: true });
}));

app.put('/api/settings', auth, wrap(async (req, res) => {
  if (req.auth.role !== 'admin') return forbid(res);
  await repo.saveSettings(req.body as AppSettings);
  res.json({ ok: true });
}));

// ---------- Static frontend (production) ----------
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
app.use(express.static(dist));
app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html'), err => err && res.status(404).end()));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
});

await migrate();
const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`API listening on :${port}`));
