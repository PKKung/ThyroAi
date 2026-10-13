import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      {htmlFor ? <label htmlFor={htmlFor} className="field__label">{label}</label> : <span className="field__label">{label}</span>}
      {children}
      {error && <span className="field__error" role="alert">{error}</span>}
    </div>
  );
}
