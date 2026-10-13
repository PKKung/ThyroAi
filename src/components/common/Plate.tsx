import type { CSSProperties } from 'react';
import type { Food } from '@/types';

interface PlateProps {
  food: Food;
  size?: number;
}

/** ภาพจานอาหารแบบวาด (แทนรูปถ่ายในข้อมูลจำลอง) */
export function Plate({ food, size = 64 }: PlateProps) {
  const style = { '--s': `${size}px`, '--h': food.hue } as CSSProperties;
  return (
    <div className="plate" style={style} role="img" aria-label={food.name}>
      <span className="plate__main">{food.emoji}</span>
      {food.side && <span className="plate__side">{food.side}</span>}
    </div>
  );
}
