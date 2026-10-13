import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FoodRow, Icon, TopBar } from '@/components/common';
import { FOODS } from '@/data/foods';
import { useAppStore } from '@/store/useAppStore';

const CATS = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: '1', label: 'แนะนำ' },
  { key: '2', label: 'จำกัดปริมาณ' },
  { key: '3', label: 'ควรหลีกเลี่ยง' },
  { key: 'fav', label: 'ที่บันทึกไว้' },
] as const;

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') ?? 'all';
  const [q, setQ] = useState('');
  const favorites = useAppStore((s) => s.favorites);

  const list = useMemo(() => {
    const term = q.trim();
    return FOODS.filter((f) =>
      (cat === 'all' || (cat === 'fav' ? favorites.includes(f.id) : f.level === Number(cat))) &&
      (!term || f.name.includes(term)));
  }, [cat, q, favorites]);

  return (
    <div className="page">
      <TopBar title="เมนูอาหาร" />
      <div className="page__body">
        <label className="search">
          <Icon name="search" size={20} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาเมนูอาหาร" aria-label="ค้นหาเมนูอาหาร" />
        </label>
        <div className="chips">
          {CATS.map((c) => (
            <button key={c.key} className={`chip${cat === c.key ? ' is-active' : ''}`}
              onClick={() => setParams(c.key === 'all' ? {} : { cat: c.key }, { replace: true })}>{c.label}</button>
          ))}
        </div>
        <span className="count">{list.length} เมนู</span>
        {list.length ? (
          <div className="list">{list.map((f) => <FoodRow key={f.id} food={f} />)}</div>
        ) : (
          <div className="empty">
            <Icon name="search" size={32} />
            <b>{q ? `ไม่พบเมนู “${q}”` : 'ยังไม่มีเมนูที่บันทึกไว้'}</b>
            <span>{q ? 'ลองค้นหาด้วยชื่อวัตถุดิบ เช่น ไก่ ปลา ข้าว' : 'กดไอคอนบุ๊กมาร์กที่เมนูเพื่อบันทึก'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
