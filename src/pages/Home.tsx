import { Link } from 'react-router-dom';
import { FavButton, HistoryRow, Icon, Plate, useToast } from '@/components/common';
import { FOODS, getFood } from '@/data/foods';
import { useAppStore, useMedTakenToday, useWaterToday } from '@/store/useAppStore';
import { dailyTarget, dayOffset, fmt } from '@/utils/health';

const WATER_GOAL = 2;

export default function Home() {
  const toast = useToast();
  const profile = useAppStore((s) => s.profile);
  const history = useAppStore((s) => s.history);
  const favorites = useAppStore((s) => s.favorites);
  const { toggleFavorite, addWater, toggleMedTaken } = useAppStore();
  const water = useWaterToday();
  const medTaken = useMedTakenToday();

  const target = dailyTarget(profile);
  const eaten = history.filter((h) => dayOffset(h.ts) === 0).reduce((sum, h) => sum + (getFood(h.foodId)?.kcal ?? 0), 0);
  const pct = Math.min(100, Math.round((eaten / target) * 100));
  const medName = (profile.medication || 'ยาไทรอยด์').split(' ')[0];
  const firstName = profile.name.trim().split(/\s+/)[0];

  return (
    <div className="page">
      <header className="hello">
        <div>
          <small>{profile.sex === 'ชาย' ? 'สวัสดีครับ' : 'สวัสดีค่ะ'}</small>
          <h1>{firstName}</h1>
        </div>
        <Link to="/profile" className="avatar" aria-label="โปรไฟล์">{firstName.charAt(0)}</Link>
      </header>

      <div className="page__body">
        <div className={`med${medTaken ? ' is-done' : ''}`}>
          <span className="med__icon"><Icon name="pill" /></span>
          <div className="med__text">
            <b>{medTaken ? `กิน ${medName} แล้ววันนี้` : `ยังไม่ได้กิน ${medName}`}</b>
            <small>{medTaken ? 'รอ 30–60 นาทีก่อนอาหารเช้าหรือกาแฟ' : 'กินตอนท้องว่าง พร้อมน้ำเปล่า 1 แก้ว'}</small>
          </div>
          <button onClick={toggleMedTaken}>{medTaken ? '✓ กินแล้ว' : 'บันทึก'}</button>
        </div>

        <section className="overview" aria-label="ภาพรวมวันนี้">
          <div className="overview__top">
            <b>ภาพรวมวันนี้</b>
            <span>{new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="overview__stats">
            <div className="stat"><small>แคลอรี่ที่แนะนำ</small><b className="num">{fmt(target)}<em>kcal</em></b></div>
            <div className="stat"><small>กินไปแล้ว</small><b className="num">{fmt(eaten)}<em>kcal</em></b></div>
            <div className="stat"><small>น้ำดื่ม</small><b className="num">{water.toFixed(1)}<em>/ {WATER_GOAL} L</em></b></div>
          </div>
          <div className="meter" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${pct}%` }} /></div>
          <div className="overview__foot">
            <span>เหลืออีก {fmt(Math.max(0, target - eaten))} kcal</span>
            <button className="water-btn" onClick={() => { addWater(0.25); toast('บันทึกน้ำดื่ม +250 มล.'); }}>
              <Icon name="drop" size={14} /> +250 มล.
            </button>
          </div>
        </section>

        <div className="quick">
          <Link to="/scan" className="quick__a"><Icon name="scan" />สแกนอาหาร</Link>
          <Link to="/menu" className="quick__b"><Icon name="search" />ค้นหาเมนู</Link>
        </div>

        <div className="section-head"><h2>เมนูแนะนำสำหรับคุณ</h2><Link to="/menu?cat=1">ดูทั้งหมด</Link></div>
        <div className="hscroll">
          {FOODS.filter((f) => f.level === 1).map((f) => (
            <div key={f.id} className="rcard">
              <FavButton className="rcard__fav" active={favorites.includes(f.id)}
                onClick={() => toast(toggleFavorite(f.id) ? 'บันทึกเมนูแล้ว' : 'นำออกจากเมนูที่บันทึก')} />
              <Link to={`/result/${f.id}`} className="rcard__link">
                <Plate food={f} size={76} />
                <b>{f.name}</b>
                <small className="num">{f.kcal} kcal</small>
              </Link>
            </div>
          ))}
        </div>

        <div className="section-head"><h2>วิเคราะห์ล่าสุด</h2><Link to="/history">ทั้งหมด</Link></div>
        <div className="list">{history.slice(0, 2).map((h) => <HistoryRow key={h.id} entry={h} />)}</div>
      </div>
    </div>
  );
}
