import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { HistoryRow, Icon, TopBar } from '@/components/common';
import { getFood } from '@/data/foods';
import { useAppStore } from '@/store/useAppStore';
import { dayLabel, fmt, startOfDay } from '@/utils/health';

const FILTERS = [0, 1, 2, 3] as const;

export default function History() {
  const history = useAppStore((s) => s.history);
  const [lv, setLv] = useState<number>(0);

  const items = [...history]
    .sort((a, b) => b.ts - a.ts)
    .filter((h) => !lv || getFood(h.foodId)?.level === lv);

  const groups = new Map<number, typeof items>();
  items.forEach((h) => {
    const k = startOfDay(h.ts);
    groups.set(k, [...(groups.get(k) ?? []), h]);
  });

  return (
    <div className="page">
      <TopBar title="ประวัติการวิเคราะห์" />
      <div className="page__body">
        <div className="chips">
          {FILTERS.map((k) => (
            <button key={k} className={`chip${lv === k ? ' is-active' : ''}`} onClick={() => setLv(k)}>
              {k ? `ระดับ ${k}` : 'ทั้งหมด'}
            </button>
          ))}
        </div>
        {items.length ? (
          <div className="list">
            {[...groups.entries()].map(([day, rows]) => (
              <Fragment key={day}>
                <span className="group-head">
                  {dayLabel(day)} · {fmt(rows.reduce((s, h) => s + (getFood(h.foodId)?.kcal ?? 0), 0))} kcal
                </span>
                {rows.map((h) => <HistoryRow key={h.id} entry={h} />)}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="empty">
            <Icon name="history" size={32} />
            <b>ยังไม่มีรายการในระดับนี้</b>
            <span>สแกนอาหารแล้วกด “บันทึกผล” เพื่อเก็บไว้ที่นี่</span>
            <Link to="/scan" className="btn btn--sm">สแกนอาหาร</Link>
          </div>
        )}
      </div>
    </div>
  );
}
