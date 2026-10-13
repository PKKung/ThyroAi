import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

interface TopBarProps {
  title: string;
  step?: string;
  progress?: number;
  showBack?: boolean;
  fallback?: string;
  right?: ReactNode;
}

export function TopBar({ title, step, progress, showBack = true, fallback = '/home', right }: TopBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => (location.key === 'default' ? navigate(fallback) : navigate(-1));

  return (
    <>
      <header className="topbar">
        {showBack ? (
          <button className="icon-btn" onClick={goBack} aria-label="ย้อนกลับ"><Icon name="back" /></button>
        ) : <span />}
        <h1 className="topbar__title">{title}</h1>
        {step ? <span className="topbar__step">{step}</span> : right ?? <span />}
      </header>
      {progress !== undefined && (
        <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ width: `${progress}%` }} />
        </div>
      )}
    </>
  );
}
