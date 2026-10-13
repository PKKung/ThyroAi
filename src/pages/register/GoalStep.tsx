import { useNavigate, useSearchParams } from 'react-router-dom';
import { TopBar } from '@/components/common';
import { useAppStore } from '@/store/useAppStore';
import { ACTIVITIES, GOALS, type Activity } from '@/types';
import { Field } from './Field';

const ACTIVITY_DESC: Record<Activity, string> = {
  น้อย: 'นั่งทำงานเป็นส่วนใหญ่',
  ปานกลาง: 'เดิน/ออกกำลัง 3–4 วันต่อสัปดาห์',
  มาก: 'ออกกำลังเกือบทุกวัน',
};

export default function GoalStep() {
  const navigate = useNavigate();
  const editing = useSearchParams()[0].has('edit');
  const { goal, activity } = useAppStore((s) => s.profile);
  const updateProfile = useAppStore((s) => s.updateProfile);

  return (
    <div className="page">
      <TopBar title={editing ? 'เป้าหมายการดูแลสุขภาพ' : 'ข้อมูลเพิ่มเติม'} step={editing ? undefined : '3/4'} progress={editing ? undefined : 75} />
      <div className="page__body">
        <Field label="เป้าหมายการดูแลสุขภาพ">
          <div className="options" role="radiogroup">
            {GOALS.map((g) => (
              <button key={g} type="button" role="radio" aria-checked={g === goal}
                className={`option${g === goal ? ' is-active' : ''}`} onClick={() => updateProfile({ goal: g })}>
                <span className="option__dot" />{g}
              </button>
            ))}
          </div>
        </Field>
        <Field label="ระดับกิจกรรมในแต่ละวัน">
          <div className="activities" role="radiogroup">
            {ACTIVITIES.map((a, i) => (
              <button key={a} type="button" role="radio" aria-checked={a === activity}
                className={`activity${a === activity ? ' is-active' : ''}`} onClick={() => updateProfile({ activity: a })}>
                <span className="activity__bars">{[0, 1, 2].map((n) => <i key={n} className={n <= i ? 'on' : ''} />)}</span>
                <b>{a}</b>
                <small>{ACTIVITY_DESC[a]}</small>
              </button>
            ))}
          </div>
        </Field>
      </div>
      <div className="page__foot">
        <button className="btn" onClick={() => navigate(editing ? '/profile' : '/register/4')}>{editing ? 'บันทึก' : 'ถัดไป'}</button>
      </div>
    </div>
  );
}
