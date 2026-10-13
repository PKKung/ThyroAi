import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

const TABS: { to: string; label: string; icon: IconName }[] = [
  { to: '/home', label: 'หน้าแรก', icon: 'home' },
  { to: '/scan', label: 'สแกน', icon: 'scan' },
  { to: '/menu', label: 'เมนูอาหาร', icon: 'menu' },
  { to: '/history', label: 'ประวัติ', icon: 'history' },
  { to: '/profile', label: 'โปรไฟล์', icon: 'user' },
];

export function TabBar({ dark = false }: { dark?: boolean }) {
  return (
    <nav className={`tabbar${dark ? ' tabbar--dark' : ''}`} aria-label="เมนูหลัก">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} className={({ isActive }) => `tabbar__item${isActive ? ' is-active' : ''}`}>
          <Icon name={t.icon} />
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
