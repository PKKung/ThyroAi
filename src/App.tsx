import { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { TabBar } from '@/components/common';
import { useAppStore } from '@/store/useAppStore';
import Splash from '@/pages/Splash';
import PersonalStep from '@/pages/register/PersonalStep';
import HealthStep from '@/pages/register/HealthStep';
import GoalStep from '@/pages/register/GoalStep';
import ReviewStep from '@/pages/register/ReviewStep';
import Home from '@/pages/Home';
import Scan from '@/pages/Scan';
import Result from '@/pages/Result';
import Menu from '@/pages/Menu';
import History from '@/pages/History';
import Profile from '@/pages/Profile';

function ThemeSync() {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);
  return null;
}

/** หน้าในแอปหลัก: ต้องลงทะเบียนก่อน + มีแถบเมนูล่าง */
function MainLayout() {
  const onboarded = useAppStore((s) => s.onboarded);
  const { pathname } = useLocation();
  if (!onboarded) return <Navigate to="/" replace />;
  return (
    <>
      <main className="screen" key={pathname}><Outlet /></main>
      <TabBar dark={pathname === '/scan'} />
    </>
  );
}

function PlainLayout() {
  const { pathname } = useLocation();
  return <main className="screen" key={pathname}><Outlet /></main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeSync />
      <div className="app-shell">
        <Routes>
          <Route element={<PlainLayout />}>
            <Route index element={<Splash />} />
            <Route path="register">
              <Route index element={<Navigate to="1" replace />} />
              <Route path="1" element={<PersonalStep />} />
              <Route path="2" element={<HealthStep />} />
              <Route path="3" element={<GoalStep />} />
              <Route path="4" element={<ReviewStep />} />
            </Route>
          </Route>
          <Route element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="scan" element={<Scan />} />
            <Route path="result/:id" element={<Result />} />
            <Route path="menu" element={<Menu />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
