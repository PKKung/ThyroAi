import { useState, type CSSProperties } from 'react';
import type { Food } from '@/types';

interface PlateProps {
  food: Food;
  size?: number;
}

export function Plate({ food, size = 64 }: PlateProps) {
  const [failed, setFailed] = useState(false);
  const style = { '--s': `${size}px`, '--h': food.hue } as CSSProperties;

  if (!failed) {
    return (
      <img className="plate plate--photo" style={style} src={food.image ?? `/foods/${food.id}.jpg`}
        alt={food.name} loading="lazy" onError={() => setFailed(true)} />
    );
  }
  return (
    <div className="plate" style={style} role="img" aria-label={food.name}>
      <span className="plate__main">{food.emoji}</span>
      {food.side && <span className="plate__side">{food.side}</span>}
    </div>
  );
}
