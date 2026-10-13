const PATHS = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10',
  menu: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11M9 8h6',
  history: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  back: 'M15 5l-7 7 7 7',
  chev: 'M9 5l7 7-7 7',
  down: 'M6 9l6 6 6-6',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  check: 'M5 12l5 5 9-10',
  warn: 'M12 4 2.5 20h19zM12 10v4M12 17h.01',
  x: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9l6 6M15 9l-6 6',
  bell: 'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
  flash: 'M13 3 5 14h6l-1 7 8-11h-6z',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 8.5h.01',
  flip: 'M4 9h11a4 4 0 0 1 0 8H9M7 6 4 9l3 3',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  pill: 'M7 17a4.24 4.24 0 0 1 0-6l4-4a4.24 4.24 0 0 1 6 6l-4 4a4.24 4.24 0 0 1-6 0zM9 9l6 6',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8h.01',
  doc: 'M6 3h9l4 4v14H6zM9 13h6M12 10v6',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01',
  article: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
  chat: 'M4 5h16v11H8l-4 4z',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  smile: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 14a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01',
  meh: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 15h7M9 9.5h.01M15 9.5h.01',
  frown: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 16a4.5 4.5 0 0 1 7 0M9 9.5h.01M15 9.5h.01',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 22, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg className={['icon', className].filter(Boolean).join(' ')} width={size} height={size}
      viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
