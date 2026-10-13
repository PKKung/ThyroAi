import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, useToast, type IconName } from '@/components/common';
import { useAppStore } from '@/store/useAppStore';
import { bmi } from '@/utils/health';

export default function Profile() {
  const navigate = useNavigate();
  const toast = useToast();
  const { profile, remind, theme, toggleRemind, setTheme, logout } = useAppStore();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const isDark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);

  const edits: { to: string; label: string; icon: IconName }[] = [
    { to: '/register/1?edit', label: 'ข้อมูลส่วนตัว', icon: 'user' },
    { to: '/register/2?edit', label: 'ข้อมูลสุขภาพ', icon: 'doc' },
    { to: '/register/3?edit', label: 'เป้าหมายการดูแลสุขภาพ', icon: 'target' },
  ];
  const infos: { label: string; icon: IconName; msg: string }[] = [
    { label: 'บทความน่ารู้', icon: 'article', msg: 'บทความน่ารู้จะเปิดให้อ่านเร็วๆ นี้' },
    { label: 'เกี่ยวกับแอป', icon: 'info', msg: 'ThyroAI เวอร์ชัน 1.0 (Prototype)' },
    { label: 'ติดต่อเรา', icon: 'chat', msg: 'ติดต่อทีมงาน: support@thyroai.app' },
  ];

  const onLogout = () => {
    if (!confirmLogout) return setConfirmLogout(true);
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="page">
      <header className="topbar">
        <span />
        <h1 className="topbar__title">โปรไฟล์</h1>
        <button className="icon-btn" aria-label="สลับธีม" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          <Icon name={isDark ? 'sun' : 'moon'} />
        </button>
      </header>
      <div className="page__body">
        <div className="pcard">
          <span className="avatar avatar--lg">{profile.name.trim().charAt(0)}</span>
          <div className="pcard__text">
            <b>{profile.name}</b>
            <small>{profile.email}</small>
            <div className="tags"><span>{profile.thyroid}</span><span>BMI {bmi(profile)}</span></div>
          </div>
        </div>

        <div className="menu-list">
          {edits.map((e) => (
            <Link key={e.to} to={e.to} className="menu-row">
              <Icon name={e.icon} className="menu-row__lead" /><span>{e.label}</span><Icon name="chev" size={18} className="muted" />
            </Link>
          ))}
          <button className="menu-row" role="switch" aria-checked={remind}
            onClick={() => { toggleRemind(); toast(remind ? 'ปิดแจ้งเตือนแล้ว' : 'เปิดแจ้งเตือนเวลา 06:30 น.'); }}>
            <Icon name="bell" className="menu-row__lead" /><span>แจ้งเตือนกินยาตอนเช้า</span><i className={`switch${remind ? ' is-on' : ''}`} />
          </button>
        </div>

        <div className="menu-list">
          {infos.map((i) => (
            <button key={i.label} className="menu-row" onClick={() => toast(i.msg)}>
              <Icon name={i.icon} className="menu-row__lead" /><span>{i.label}</span><Icon name="chev" size={18} className="muted" />
            </button>
          ))}
        </div>

        <button className="logout" onClick={onLogout} onBlur={() => setConfirmLogout(false)}>
          {confirmLogout ? 'แตะอีกครั้งเพื่อยืนยันออกจากระบบ' : 'ออกจากระบบ'}
        </button>
      </div>
    </div>
  );
}
