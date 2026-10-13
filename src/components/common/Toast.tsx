import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

type ToastFn = (message: string) => void;
const ToastContext = createContext<ToastFn>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number>();

  const show = useCallback<ToastFn>((message) => {
    setMsg(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 2400);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {msg && <div className="toast" role="status">{msg}</div>}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
