export function ThyroidLogo({ size = 32, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g fill={color}>
        <path d="M29 24C27 13 20 8 14 10 7 12 6 22 8 32c2 12 8 22 15 21 6-1 7-9 6-17z" />
        <path d="M35 24c2-11 9-16 15-14 7 2 8 12 6 22-2 12-8 22-15 21-6-1-7-9-6-17z" />
        <rect x="26" y="30" width="12" height="9" rx="4" />
      </g>
      <path d="M32 6v14" stroke={color} strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}
