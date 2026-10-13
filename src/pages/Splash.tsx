import { useNavigate } from 'react-router-dom';
import { Plate, ThyroidLogo } from '@/components/common';
import { getFood } from '@/data/foods';
import { useAppStore } from '@/store/useAppStore';

export default function Splash() {
  const navigate = useNavigate();
  const onboarded = useAppStore((s) => s.onboarded);

  return (
    <div className="page splash">
      <span className="splash__ring splash__ring--a" />
      <span className="splash__ring splash__ring--b" />
      <div className="splash__brand">
        <div className="splash__mark"><ThyroidLogo size={58} /></div>
        <h1>Thyro<b>AI</b></h1>
        <p>อัจฉริยะวิเคราะห์อาหาร<br />สำหรับผู้ป่วยโรคไทรอยด์</p>
      </div>
      <Plate food={getFood('salmon')!} size={220} />
      <div className="splash__foot">
        <button className="btn btn--light" onClick={() => navigate(onboarded ? '/home' : '/register/1')}>
          {onboarded ? 'เข้าสู่แอป' : 'เริ่มต้นใช้งาน'}
        </button>
        <p>ข้อมูลสุขภาพของคุณถูกเก็บไว้ในเครื่องนี้เท่านั้น</p>
      </div>
    </div>
  );
}
