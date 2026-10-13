import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, TopBar, useToast } from '@/components/common';
import { useAppStore } from '@/store/useAppStore';
import { bmi, dailyTarget, fmt } from '@/utils/health';

export default function ReviewStep() {
  const navigate = useNavigate();
  const toast = useToast();
  const p = useAppStore((s) => s.profile);
  const complete = useAppStore((s) => s.completeOnboarding);
  const [agree, setAgree] = useState(false);

  const rows: [string, string][] = [
    ['ชื่อ-นามสกุล', p.name],
    ['อายุ', `${p.age} ปี`],
    ['เพศ', p.sex],
    ['น้ำหนัก / ส่วนสูง', `${p.weight} กก. / ${p.height} ซม.`],
    ['ประเภทโรคไทรอยด์', p.thyroid],
    ['ระยะเวลาที่เป็นโรค', p.duration],
    ['ยาที่รับประทาน', p.medication || '-'],
    ['โรคประจำตัวอื่น', p.chronic || '-'],
    ['อาหารที่แพ้', p.allergy || '-'],
    ['เป้าหมาย', p.goal],
    ['ระดับกิจกรรม', p.activity],
  ];

  const finish = () => {
    complete();
    toast(`ตั้งค่าเสร็จแล้ว พลังงานแนะนำ ${fmt(dailyTarget(p))} kcal/วัน`);
    navigate('/home', { replace: true });
  };

  return (
    <div className="page">
      <TopBar title="ตรวจสอบข้อมูล" step="4/4" progress={100} />
      <div className="page__body">
        <dl className="review">
          {rows.map(([k, v]) => <div key={k} className="review__row"><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="calc">
          <div><small>ดัชนีมวลกาย (BMI)</small><b className="num">{bmi(p)}</b></div>
          <div><small>พลังงานแนะนำต่อวัน</small><b className="num">{fmt(dailyTarget(p))}</b> <small className="inline">kcal</small></div>
        </div>
        <button type="button" className={`check${agree ? ' is-active' : ''}`} role="checkbox" aria-checked={agree} onClick={() => setAgree(!agree)}>
          <span className="check__box"><Icon name="check" size={14} strokeWidth={3} /></span>
          <span>ยอมรับข้อตกลงและเงื่อนไขการใช้งาน และเข้าใจว่าผลวิเคราะห์ไม่ใช่การวินิจฉัยทางการแพทย์</span>
        </button>
      </div>
      <div className="page__foot"><button className="btn" disabled={!agree} onClick={finish}>เริ่มใช้งานแอป</button></div>
    </div>
  );
}
