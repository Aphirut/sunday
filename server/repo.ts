import { pool, parseJson } from './db';
import type { User, Course, UserCourseProgress, Certificate, EmailNotification, CourseAnalytics, UserNote, AppSettings } from '../src/types';

type UserRow = Omit<User, 'notes'>;
const toUser = (r: any): UserRow => ({
  id: r.id, name: r.name, email: r.email, avatar: r.avatar || '', role: r.role,
  createdAt: r.created_at, department: r.department || undefined, phone: r.phone || undefined,
  enrolledCourseIds: parseJson<string[]>(r.enrolled_course_ids),
});

export async function insertUser(u: UserRow, passwordHash: string) {
  await pool.query(
    `INSERT INTO users (id,name,email,password_hash,avatar,role,department,phone,enrolled_course_ids,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [u.id, u.name, u.email.toLowerCase(), passwordHash, u.avatar, u.role, u.department ?? null, u.phone ?? null,
     JSON.stringify(u.enrolledCourseIds || []), u.createdAt]
  );
}
export async function updateUserProfile(u: UserRow, allowRole: boolean) {
  await pool.query(
    `UPDATE users SET name=?, avatar=?, department=?, phone=?, enrolled_course_ids=?${allowRole ? ', role=?' : ''} WHERE id=?`,
    [u.name, u.avatar, u.department ?? null, u.phone ?? null, JSON.stringify(u.enrolledCourseIds || []),
     ...(allowRole ? [u.role] : []), u.id]
  );
}
export const deleteUser = async (id: string) => {
  await pool.query('DELETE FROM notes WHERE user_id=?', [id]);
  await pool.query('DELETE FROM progress WHERE user_id=?', [id]);
  await pool.query('DELETE FROM users WHERE id=?', [id]);
};
export async function getUserById(id: string) {
  const [r] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
  return (r as any[])[0] as any | undefined;
}
export async function getUserByEmail(email: string) {
  const [r] = await pool.query('SELECT * FROM users WHERE email=?', [email.toLowerCase()]);
  return (r as any[])[0] as any | undefined;
}
export async function listUsers(onlyId?: string): Promise<UserRow[]> {
  const [r] = await pool.query(onlyId ? 'SELECT * FROM users WHERE id=?' : 'SELECT * FROM users', onlyId ? [onlyId] : []);
  return (r as any[]).map(toUser);
}
export { toUser };

export async function saveCourse(c: Course) {
  await pool.query(
    `INSERT INTO courses (id,title,category,published,created_by_id,classroom_code,data) VALUES (?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE title=VALUES(title),category=VALUES(category),published=VALUES(published),
       classroom_code=VALUES(classroom_code),data=VALUES(data)`,
    [c.id, c.title, c.category, c.published ? 1 : 0, c.createdById ?? null, c.classroomCode ?? null, JSON.stringify(c)]
  );
}
export const getCourseRow = async (id: string) =>
  ((await pool.query('SELECT id, created_by_id FROM courses WHERE id=?', [id]))[0] as any[])[0] as
    { id: string; created_by_id: string | null } | undefined;
export const deleteCourse = async (id: string) => {
  await pool.query('DELETE FROM courses WHERE id=?', [id]);
  await pool.query('DELETE FROM progress WHERE course_id=?', [id]);
};
export async function listCourses(user: { id: string; role: string }): Promise<Course[]> {
  const [r] = user.role === 'admin'
    ? await pool.query('SELECT data FROM courses')
    : await pool.query('SELECT data FROM courses WHERE published=1 OR created_by_id=?', [user.id]);
  return (r as any[]).map(x => parseJson<Course>(x.data));
}

export async function saveProgress(p: UserCourseProgress) {
  await pool.query(
    `INSERT INTO progress (user_id,course_id,data) VALUES (?,?,?) ON DUPLICATE KEY UPDATE data=VALUES(data)`,
    [p.userId, p.courseId, JSON.stringify(p)]
  );
}
export async function listProgress(user: { id: string; role: string }): Promise<UserCourseProgress[]> {
  const [r] = user.role === 'admin' ? await pool.query('SELECT data FROM progress')
    : user.role === 'teacher'
      ? await pool.query(
          `SELECT p.data FROM progress p LEFT JOIN courses c ON c.id=p.course_id WHERE p.user_id=? OR c.created_by_id=?`, [user.id, user.id])
      : await pool.query('SELECT data FROM progress WHERE user_id=?', [user.id]);
  return (r as any[]).map(x => parseJson<UserCourseProgress>(x.data));
}

export async function saveCertificate(c: Certificate) {
  await pool.query(
    `INSERT INTO certificates (id,credential_id,user_id,course_id,data) VALUES (?,?,?,?,?)
     ON DUPLICATE KEY UPDATE data=VALUES(data)`,
    [c.id, c.credentialId, c.userId, c.courseId, JSON.stringify(c)]
  );
}
export async function listCertificates(user: { id: string; role: string }): Promise<Certificate[]> {
  const [r] = user.role === 'admin' ? await pool.query('SELECT data FROM certificates')
    : user.role === 'teacher'
      ? await pool.query(
          `SELECT k.data FROM certificates k LEFT JOIN courses c ON c.id=k.course_id WHERE k.user_id=? OR c.created_by_id=?`, [user.id, user.id])
      : await pool.query('SELECT data FROM certificates WHERE user_id=?', [user.id]);
  return (r as any[]).map(x => parseJson<Certificate>(x.data));
}

export async function saveNotification(n: EmailNotification) {
  await pool.query(
    `INSERT INTO notifications (id,to_email,is_read,data) VALUES (?,?,?,?)
     ON DUPLICATE KEY UPDATE is_read=VALUES(is_read),data=VALUES(data)`,
    [n.id, n.toEmail.toLowerCase(), n.isRead ? 1 : 0, JSON.stringify(n)]
  );
}
export const getNotificationEmail = async (id: string) =>
  (((await pool.query('SELECT to_email FROM notifications WHERE id=?', [id]))[0] as any[])[0]?.to_email) as string | undefined;
export async function listNotifications(user: { email: string; role: string }): Promise<EmailNotification[]> {
  const [r] = user.role === 'admin' ? await pool.query('SELECT data FROM notifications')
    : await pool.query('SELECT data FROM notifications WHERE to_email=?', [user.email.toLowerCase()]);
  return (r as any[]).map(x => parseJson<EmailNotification>(x.data));
}

export async function saveNote(n: UserNote) {
  await pool.query(
    `INSERT INTO notes (id,user_id,course_id,data) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE data=VALUES(data)`,
    [n.id, n.userId, n.courseId, JSON.stringify(n)]
  );
}
export const getNoteOwner = async (id: string) =>
  (((await pool.query('SELECT user_id FROM notes WHERE id=?', [id]))[0] as any[])[0]?.user_id) as string | undefined;
export const deleteNote = async (id: string) => { await pool.query('DELETE FROM notes WHERE id=?', [id]); };
export async function listNotes(userIds?: string[]): Promise<UserNote[]> {
  const [r] = userIds
    ? await pool.query('SELECT data FROM notes WHERE user_id IN (?)', [userIds.length ? userIds : ['']])
    : await pool.query('SELECT data FROM notes');
  return (r as any[]).map(x => parseJson<UserNote>(x.data));
}

export async function saveAnalytics(a: CourseAnalytics) {
  await pool.query(
    `INSERT INTO analytics (course_id,data) VALUES (?,?) ON DUPLICATE KEY UPDATE data=VALUES(data)`,
    [a.courseId, JSON.stringify(a)]
  );
}
export async function listAnalytics(): Promise<CourseAnalytics[]> {
  const [r] = await pool.query('SELECT data FROM analytics');
  return (r as any[]).map(x => parseJson<CourseAnalytics>(x.data));
}

export async function getSettings(): Promise<Partial<AppSettings> | null> {
  const [r] = await pool.query("SELECT v FROM app_settings WHERE k='app'");
  const row = (r as any[])[0];
  return row ? parseJson<Partial<AppSettings>>(row.v) : null;
}
export async function saveSettings(s: AppSettings) {
  await pool.query(`INSERT INTO app_settings (k,v) VALUES ('app',?) ON DUPLICATE KEY UPDATE v=VALUES(v)`, [JSON.stringify(s)]);
}
