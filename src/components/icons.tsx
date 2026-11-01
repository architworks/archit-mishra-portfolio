import type { ReactNode, SVGProps } from "react";

function Line({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

export const ArrowUpRight = (props: IconProps) => (
  <Line {...props}><path d="M7 17 17 7M8 7h9v9" /></Line>
);
export const ArrowRight = (props: IconProps) => (
  <Line {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Line>
);
export const ArrowLeft = (props: IconProps) => (
  <Line {...props}><path d="M19 12H5M11 6l-6 6 6 6" /></Line>
);
export const Mail = (props: IconProps) => (
  <Line {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 8 8 5 8-5" /></Line>
);
export const Sun = (props: IconProps) => (
  <Line {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.600 5.600 7 7M17 17l1.400 1.400M5.600 18.400 7 17M17 7l1.400-1.400" />
  </Line>
);
export const Moon = (props: IconProps) => (
  <Line {...props}><path d="M20 14.500A8.500 8.500 0 0 1 9.500 4a8.500 8.500 0 1 0 10.500 10.500Z" /></Line>
);
export const Menu = (props: IconProps) => (
  <Line {...props}><path d="M4 8h16M4 16h16" /></Line>
);
export const Close = (props: IconProps) => (
  <Line {...props}><path d="M6 6l12 12M18 6 6 18" /></Line>
);
export const Pause = (props: IconProps) => (
  <Line {...props}><path d="M9 5v14M15 5v14" /></Line>
);
export const Play = (props: IconProps) => (
  <Line {...props}><path d="M8 5v14l11-7Z" /></Line>
);
export const Pin = (props: IconProps) => (
  <Line {...props}>
    <path d="M12 21s7-6.400 7-11.500A7 7 0 0 0 5 9.500C5 14.600 12 21 12 21Z" />
    <circle cx="12" cy="9.500" r="2.500" />
  </Line>
);
export const Briefcase = (props: IconProps) => (
  <Line {...props}>
    <rect x="3" y="7" width="18" height="13" rx="3" />
    <path d="M9 7V5.500A1.500 1.500 0 0 1 10.500 4h3A1.500 1.500 0 0 1 15 5.500V7" />
  </Line>
);
export const Globe = (props: IconProps) => (
  <Line {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </Line>
);
export const MarqueeStar = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 1c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11Z" />
  </svg>
);
export const QuoteMark = (props: IconProps) => (
  <svg viewBox="0 0 40 34" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17 0v5C10 8 8 12 8 15a8.500 8.500 0 1 1-8 8.500V18C0 9 8 2 17 0ZM40 0v5c-7 3-9 7-9 10a8.500 8.500 0 1 1-8 8.500V18c0-9 8-16 17-18Z" />
  </svg>
);
export const Spark = (props: IconProps) => (
  <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M7 25C8 17 10 11 13 5M15 28c4-7 9-12 15-16M19 33c4-2 8-4 13-5" />
  </svg>
);
export const SparkLarge = (props: IconProps) => (
  <svg viewBox="0 0 90 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M64 10C46 5 30 8 12 18M55 36C36 44 20 62 8 86M84 50c-8 14-14 30-14 46" />
  </svg>
);
