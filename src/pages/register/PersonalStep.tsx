import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TopBar } from '@/components/common';
import { useAppStore } from '@/store/useAppStore';
import { SEXES } from '@/types';
import { Field } from './Field';

const num = (msg: string, min: number, max: number) =>
  z.coerce.number({ invalid_type_error: msg }).min(min, msg).max(max, msg);

const schema = z.object({
  name: z.string().trim().min(2, 'กรุณากรอกชื่อ-นามสกุล'),
  age: num('กรอกอายุระหว่าง 10–100 ปี', 10, 100),
  sex: z.enum(SEXES),
  weight: num('น้ำหนัก 30–200 กก.', 30, 200),
  height: num('ส่วนสูง 120–220 ซม.', 120, 220),
});
type FormValues = z.infer<typeof schema>;

export default function PersonalStep() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editing = params.has('edit');
  const profile = useAppStore((s) => s.profile);
  const updateProfile = useAppStore((s) => s.updateProfile);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: profile.name, age: profile.age, sex: profile.sex, weight: profile.weight, height: profile.height },
  });
  const sex = watch('sex');

  const onSubmit = (v: FormValues) => {
    updateProfile(v);
    navigate(editing ? '/profile' : '/register/2');
  };

  return (
    <form className="page" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TopBar title="ข้อมูลส่วนตัว" step={editing ? undefined : '1/4'} progress={editing ? undefined : 25} fallback="/" />
      <div className="page__body">
        <Field label="ชื่อ-นามสกุล" htmlFor="name" error={errors.name?.message}>
          <div className="input"><input id="name" autoComplete="name" {...register('name')} /></div>
        </Field>
        <Field label="อายุ" htmlFor="age" error={errors.age?.message}>
          <div className="input"><input id="age" type="number" inputMode="numeric" {...register('age')} /><span className="input__unit">ปี</span></div>
        </Field>
        <Field label="เพศ">
          <div className="segment" role="radiogroup" aria-label="เพศ">
            {SEXES.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={sex === s}
                className={sex === s ? 'is-active' : ''} onClick={() => setValue('sex', s)}>{s}</button>
            ))}
          </div>
        </Field>
        <div className="grid-2">
          <Field label="น้ำหนัก" htmlFor="weight" error={errors.weight?.message}>
            <div className="input"><input id="weight" type="number" inputMode="decimal" step="0.1" {...register('weight')} /><span className="input__unit">กก.</span></div>
          </Field>
          <Field label="ส่วนสูง" htmlFor="height" error={errors.height?.message}>
            <div className="input"><input id="height" type="number" inputMode="decimal" {...register('height')} /><span className="input__unit">ซม.</span></div>
          </Field>
        </div>
      </div>
      <div className="page__foot"><button className="btn" type="submit">{editing ? 'บันทึก' : 'ถัดไป'}</button></div>
    </form>
  );
}
