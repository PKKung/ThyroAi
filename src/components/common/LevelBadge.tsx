import type { Level } from '@/types';

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={`level level--${level}`}>
      <i aria-hidden="true" />
      ระดับ {level}
    </span>
  );
}
