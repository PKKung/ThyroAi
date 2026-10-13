import type { Profile } from '@/types';

const ACTIVITY_FACTOR = { น้อย: 1.2, ปานกลาง: 1.375, มาก: 1.55 } as const;

/** Mifflin-St Jeor × activity, ปรับตามเป้าหมาย */
export function dailyTarget(p: Profile): number {
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + (p.sex === 'ชาย' ? 5 : -161);
  let t = bmr * ACTIVITY_FACTOR[p.activity];
  if (p.goal === 'ควบคุมน้ำหนัก') t -= 300;
  if (p.goal === 'เพิ่มน้ำหนัก') t += 300;
  return Math.round(t / 10) * 10;
}

export const bmi = (p: Profile): number => +(p.weight / (p.height / 100) ** 2).toFixed(1);

export const fmt = (n: number): string => n.toLocaleString('en-US');

export const startOfDay = (ts: number): number => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

/** 0 = วันนี้, -1 = เมื่อวาน ... */
export const dayOffset = (ts: number): number =>
  Math.round((startOfDay(ts) - startOfDay(Date.now())) / 86_400_000);

export function dayLabel(ts: number): string {
  const d = dayOffset(ts);
  if (d === 0) return 'วันนี้';
  if (d === -1) return 'เมื่อวาน';
  return new Date(ts).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
}

export const timeLabel = (ts: number): string =>
  new Date(ts).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });

export const todayKey = (): string => new Date().toISOString().slice(0, 10);

export const uid = (): string => Math.random().toString(36).slice(2, 10);
