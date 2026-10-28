import React, { useState } from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import { login, register } from '../api';

export const LoginView: React.FC<{ onAuthed: () => void; notice?: string }> = ({ onAuthed, notice }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(notice || null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'login') await login(email.trim(), password);
      else await register(name.trim(), email.trim(), password);
      onAuthed();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setBusy(false);
    }
  };

  const input = 'w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-50 px-4 py-8 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">BB FlexLearn</h1>
          <p className="text-xs text-slate-500">{mode === 'login' ? 'เข้าสู่ระบบเพื่อเริ่มเรียน' : 'สมัครสมาชิกใหม่'}</p>
        </div>

        {mode === 'register' && (
          <input className={input} placeholder="ชื่อ-นามสกุล" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
        )}
        <input className={input} type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <input
          className={input} type="password" placeholder={mode === 'register' ? 'รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)' : 'รหัสผ่าน'}
          value={password} onChange={e => setPassword(e.target.value)} required minLength={mode === 'register' ? 8 : 1}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        />

        {error && <p role="alert" className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p>}

        <button disabled={busy} className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 disabled:opacity-60">
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        </button>

        <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}
          className="w-full text-xs text-indigo-700 hover:underline">
          {mode === 'login' ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีแล้ว? เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
};
