import { useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Icon, Plate, TopBar, useToast, type IconName } from '@/components/common';
import { LEVEL_INFO, getFood } from '@/data/foods';
import { useAppStore } from '@/store/useAppStore';
import type { ReasonKind } from '@/types';

const FACE: Record<number, IconName> = { 1: 'smile', 2: 'meh', 3: 'frown' };
const REASON_ICON: Record<ReasonKind, IconName> = { good: 'check', warn: 'warn', bad: 'x' };

export default function Result() {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const toast = useToast();
  const food = getFood(id);
  const lastPhoto = useAppStore((s) => s.lastPhoto);
  const addHistory = useAppStore((s) => s.addHistory);
  const [saved, setSaved] = useState(params.has('saved'));

  if (!food) return <Navigate to="/menu" replace />;
  const info = LEVEL_INFO[food.level];
  const photo = params.get('src') === 'scan' ? lastPhoto : null;
  const n = food.nutrients;

  const save = () => {
    addHistory(food.id);
    setSaved(true);
    toast('บันทึกลงประวัติแล้ว');
  };

  const share = async () => {
    const text = `ThyroAI: ${food.name} (${food.kcal} kcal) — ${info.title} ${info.label}`;
    try {
      if (navigator.share) await navigator.share({ title: 'ผลวิเคราะห์ ThyroAI', text });
      else { await navigator.clipboard.writeText(text); toast('คัดลอกผลวิเคราะห์แล้ว'); }
    } catch { /* ผู้ใช้ยกเลิก */ }
  };

  const nutrients = [
    { label: 'โปรตีน', value: n.protein, unit: 'g', max: 50, cls: 'bar--primary' },
    { label: 'ไขมัน', value: n.fat, unit: 'g', max: 50, cls: 'bar--warn' },
    { label: 'คาร์โบไฮเดรต', value: n.carb, unit: 'g', max: 100, cls: 'bar--sky' },
    { label: 'ไอโอดีน', value: n.iodine, unit: 'mcg', max: 150, cls: 'bar--ok' },
  ];

  return (
    <div className="page">
      <TopBar title="ผลการวิเคราะห์" />
      <div className="page__body">
        <div className="dish">
          {photo ? <img className="dish__photo" src={photo} alt="" /> : <Plate food={food} size={72} />}
          <div>
            <h2>{food.name}</h2>
            <small>{food.serving}</small>
            <span className="dish__kcal num">{food.kcal} kcal</span>
          </div>
        </div>

        <div className={`verdict verdict--${food.level}`}>
          <Icon name={FACE[food.level]} size={42} strokeWidth={1.6} />
          <div><h3>{info.title}</h3><p>{info.label}</p></div>
        </div>

        <section className="panel">
          <h4>เหตุผล</h4>
          <ul className="reasons">
            {food.reasons.map((r) => (
              <li key={r.text} className={`reasons__item reasons__item--${r.kind}`}><Icon name={REASON_ICON[r.kind]} size={18} />{r.text}</li>
            ))}
          </ul>
        </section>

        {food.medNote && (
          <div className="note"><Icon name="pill" size={20} /><span><b>เรื่องยา:</b> {food.medNote}</span></div>
        )}

        <section className="panel">
          <h4>สารอาหารสำคัญ <small>· ค่าประมาณต่อหน่วยบริโภค</small></h4>
          <div className="nutrients">
            {nutrients.map((x) => (
              <div key={x.label} className="nutrient">
                <div className="nutrient__label"><span>{x.label}</span><b className="num">{x.value} {x.unit}</b></div>
                <div className="nutrient__track"><i className={x.cls} style={{ width: `${Math.min(100, (x.value / x.max) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <p className="fine">ผลวิเคราะห์เป็นข้อมูลจำลองเพื่อสาธิต ไม่ใช่การวินิจฉัยหรือทดแทนคำแนะนำจากแพทย์</p>
      </div>
      <div className="page__foot grid-2">
        <button className="btn" onClick={save} disabled={saved}>{saved ? 'บันทึกแล้ว' : 'บันทึกผล'}</button>
        <button className="btn btn--ghost" onClick={share}>แชร์ผล</button>
      </div>
    </div>
  );
}
