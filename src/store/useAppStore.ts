import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { HistoryEntry, Profile, Theme } from '@/types';
import { todayKey, uid } from '@/utils/health';

const at = (dayOffset: number, hh: number, mm: number): number => {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hh, mm, 0, 0);
  return d.getTime();
};

const seedHistory = (): HistoryEntry[] => [
  { id: uid(), foodId: 'salmon', ts: at(0, 10, 30) },
  { id: uid(), foodId: 'egg', ts: at(0, 7, 45) },
  { id: uid(), foodId: 'somtam', ts: at(-1, 18, 20) },
  { id: uid(), foodId: 'basil', ts: at(-1, 12, 15) },
  { id: uid(), foodId: 'noodle', ts: at(-2, 19, 10) },
  { id: uid(), foodId: 'boba', ts: at(-2, 15, 40) },
];

export const DEFAULT_PROFILE: Profile = {
  name: 'กานต์ชนก รักสุขภาพ',
  email: 'kanchanok@email.com',
  age: 32,
  sex: 'หญิง',
  weight: 55,
  height: 160,
  thyroid: "Hashimoto's thyroiditis",
  duration: '2–5 ปี',
  medication: 'Levothyroxine (เช้า)',
  chronic: 'ความดันโลหิตต่ำ',
  allergy: '',
  goal: 'ควบคุมอาการของโรค',
  activity: 'ปานกลาง',
};

interface AppState {
  onboarded: boolean;
  profile: Profile;
  history: HistoryEntry[];
  favorites: string[];
  water: { date: string; liters: number };
  medTakenOn: string | null;
  remind: boolean;
  theme: Theme;
  /** ภาพล่าสุดจากกล้อง (ไม่ถูกบันทึกลงเครื่อง) */
  lastPhoto: string | null;

  updateProfile: (patch: Partial<Profile>) => void;
  completeOnboarding: () => void;
  addHistory: (foodId: string) => void;
  toggleFavorite: (foodId: string) => boolean;
  addWater: (liters: number) => void;
  toggleMedTaken: () => void;
  toggleRemind: () => void;
  setTheme: (t: Theme) => void;
  setLastPhoto: (p: string | null) => void;
  logout: () => void;
}

const initial = () => ({
  onboarded: false,
  profile: DEFAULT_PROFILE,
  history: seedHistory(),
  favorites: ['salmon', 'fish'],
  water: { date: todayKey(), liters: 1.2 },
  medTakenOn: todayKey(),
  remind: true,
  theme: 'system' as Theme,
  lastPhoto: null,
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initial(),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      completeOnboarding: () => set({ onboarded: true }),
      addHistory: (foodId) =>
        set((s) => ({ history: [{ id: uid(), foodId, ts: Date.now() }, ...s.history] })),
      toggleFavorite: (foodId) => {
        const has = get().favorites.includes(foodId);
        set((s) => ({ favorites: has ? s.favorites.filter((f) => f !== foodId) : [...s.favorites, foodId] }));
        return !has;
      },
      addWater: (liters) =>
        set((s) => {
          const base = s.water.date === todayKey() ? s.water.liters : 0;
          return { water: { date: todayKey(), liters: Math.min(4, +(base + liters).toFixed(2)) } };
        }),
      toggleMedTaken: () => set((s) => ({ medTakenOn: s.medTakenOn === todayKey() ? null : todayKey() })),
      toggleRemind: () => set((s) => ({ remind: !s.remind })),
      setTheme: (theme) => set({ theme }),
      setLastPhoto: (lastPhoto) => set({ lastPhoto }),
      logout: () => set(initial()),
    }),
    {
      name: 'thyroai',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ lastPhoto: _omit, ...rest }) => rest,
    },
  ),
);

export const useWaterToday = () =>
  useAppStore((s) => (s.water.date === todayKey() ? s.water.liters : 0));
export const useMedTakenToday = () => useAppStore((s) => s.medTakenOn === todayKey());
