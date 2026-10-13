export const Level = { Safe: 1, Moderate: 2, Avoid: 3 } as const;
export type Level = (typeof Level)[keyof typeof Level];

export type ReasonKind = 'good' | 'warn' | 'bad';
export interface Reason {
  kind: ReasonKind;
  text: string;
}

export interface Nutrients {
  protein: number; // g
  fat: number; // g
  carb: number; // g
  iodine: number; // mcg
}

export interface Food {
  id: string;
  name: string;
  serving: string;
  kcal: number;
  level: Level;
  emoji: string;
  side?: string;
  hue: string;
  nutrients: Nutrients;
  reasons: Reason[];
  medNote?: string;
}

export const SEXES = ['หญิง', 'ชาย'] as const;
export type Sex = (typeof SEXES)[number];

export const GOALS = ['ควบคุมน้ำหนัก', 'ควบคุมอาการของโรค', 'เพิ่มน้ำหนัก', 'ดูแลสุขภาพทั่วไป'] as const;
export type Goal = (typeof GOALS)[number];

export const ACTIVITIES = ['น้อย', 'ปานกลาง', 'มาก'] as const;
export type Activity = (typeof ACTIVITIES)[number];

export const THYROID_TYPES = [
  "Hashimoto's thyroiditis",
  "Graves' disease",
  'ภาวะไทรอยด์ทำงานต่ำ (Hypothyroidism)',
  'ภาวะไทรอยด์เป็นพิษ (Hyperthyroidism)',
  'ก้อนที่ต่อมไทรอยด์ (Thyroid nodule)',
  'หลังผ่าตัดต่อมไทรอยด์',
] as const;

export const DURATIONS = ['น้อยกว่า 1 ปี', '1–2 ปี', '2–5 ปี', 'มากกว่า 5 ปี'] as const;

export interface Profile {
  name: string;
  email: string;
  age: number;
  sex: Sex;
  weight: number;
  height: number;
  thyroid: string;
  duration: string;
  medication: string;
  chronic: string;
  allergy: string;
  goal: Goal;
  activity: Activity;
}

export interface HistoryEntry {
  id: string;
  foodId: string;
  ts: number;
}

export type Theme = 'system' | 'light' | 'dark';
