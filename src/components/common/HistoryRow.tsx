import { Link } from 'react-router-dom';
import type { HistoryEntry } from '@/types';
import { getFood } from '@/data/foods';
import { dayLabel, timeLabel } from '@/utils/health';
import { Plate } from './Plate';
import { LevelBadge } from './LevelBadge';

export function HistoryRow({ entry }: { entry: HistoryEntry }) {
  const food = getFood(entry.foodId);
  if (!food) return null;
  return (
    <Link to={`/result/${food.id}?saved=1`} className="item">
      <span className="item__time"><b className="num">{timeLabel(entry.ts)}</b>{dayLabel(entry.ts)}</span>
      <span className="item__text">
        <b>{food.name}</b>
        <span className="item__meta"><LevelBadge level={food.level} /><span className="num">{food.kcal} kcal</span></span>
      </span>
      <Plate food={food} size={48} />
    </Link>
  );
}
