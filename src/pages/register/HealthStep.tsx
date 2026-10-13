import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon, TopBar } from '@/components/common';
import { useAppStore } from '@/store/useAppStore';
import { DURATIONS, THYROID_TYPES, type Profile } from '@/types';
import { Field } from './Field';

type FormValues = Pick<Profile, 'thyroid' | 'duration' | 'medication' | 'chronic' | 'allergy'>;

export default function HealthStep() {
  const navigate = useNavigate();
  const editing = useSearchParams()[0].has('edit');
  const p = useAppStore((s) => s.profile);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { thyroid: p.thyroid, duration: p.duration, medication: p.medication, chronic: p.chronic, allergy: p.allergy },
  });

  const onSubmit = (v: FormValues) => {
    updateProfile({ ...v, medication: v.medication.trim(), chronic: v.chronic.trim(), allergy: v.allergy.trim() });
    navigate(editing ? '/profile' : '/register/3');
  };

  return (
    <form className="page" onSubmit={handleSubmit(onSubmit)}>
      <TopBar title="ข้อมูลสุขภาพ" step={editing ? undefined : '2/4'} progress={editing ? undefined : 50} />
      <div className="page__body">
        <Field label="ประเภทโรคไทรอยด์" htmlFor="thyroid">
          <div className="input">
            <select id="thyroid" {...register('thyroid')}>{THYROID_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            <Icon name="down" size={18} className="muted" />
          </div>
        </Field>
        <Field label="ระยะเวลาที่เป็นโรค" htmlFor="duration">
          <div className="input">
            <select id="duration" {...register('duration')}>{DURATIONS.map((t) => <option key={t}>{t}</option>)}</select>
            <Icon name="down" size={18} className="muted" />
          </div>
        </Field>
        <Field label="ยาที่รับประทาน" htmlFor="medication">
          <div className="input"><input id="medication" placeholder="เช่น Levothyroxine (เช้า)" {...register('medication')} /></div>
        </Field>
        <Field label="โรคประจำตัวอื่น (ถ้ามี)" htmlFor="chronic">
          <div className="input"><input id="chronic" placeholder="เช่น ความดันโลหิตสูง" {...register('chronic')} /></div>
        </Field>
        <Field label="อาหารที่แพ้ (ถ้ามี)" htmlFor="allergy">
          <div className="input"><input id="allergy" placeholder="เช่น กุ้ง, ถั่วลิสง" {...register('allergy')} /></div>
        </Field>
      </div>
      <div className="page__foot"><button className="btn" type="submit">{editing ? 'บันทึก' : 'ถัดไป'}</button></div>
    </form>
  );
}
