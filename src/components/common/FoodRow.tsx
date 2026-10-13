import { Link } from 'react-router-dom';
import type { Food } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Plate } from './Plate';
import { LevelBadge } from './LevelBadge';
import { Icon } from './Icon';
import { useToast } from './Toast';

interface FoodRowProps {
  food: Food;
}

export function FoodRow({ food }: FoodRowProps) {
  const isFav = useAppStore((s) => s.favorites.includes(food.id));
  const toggle = useAppStore((s) => s.toggleFavorite);
  const toast = useToast();

  return (
    <div className="item">
      <Link to={`/result/${food.id}`} className="item__link">
        <Plate food={food} size={52} />
        <span className="item__text">
          <b>{food.name}</b>
          <span className="item__meta"><LevelBadge level={food.level} /><span className="num">{food.kcal} kcal</span></span>
        </span>
      </Link>
      <FavButton active={isFav} onClick={() => toast(toggle(food.id) ? 'บันทึกเมนูแล้ว' : 'นำออกจากเมนูที่บันทึก')} />
    </div>
  );
}

export function FavButton({ active, onClick, className }: { active: boolean; onClick: () => void; className?: string }) {
  return (
    <button className={['fav', active && 'is-active', className].filter(Boolean).join(' ')}
      onClick={onClick} aria-pressed={active} aria-label="บันทึกเมนู">
      <Icon name="bookmark" size={18} />
    </button>
  );
}
