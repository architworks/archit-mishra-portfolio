import type { CSSProperties, ReactNode } from "react";

const star = (x: number, y: number, size = 1) =>
  "M" +
  [[0, -26], [8, -8], [28, -6], [13, 7], [18, 27], [0, 16], [-18, 27], [-13, 7], [-28, -6], [-8, -8]]
    .map(([a, b]) => `${x + a * size} ${y + b * size}`)
    .join("L") +
  "Z";

const P = ({ d }: { d: string }) => <path pathLength={1} d={d} />;
const Node = ({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) => (
  <circle pathLength={1} cx={cx} cy={cy} r={r} />
);

const drawings: { className?: string; content: ReactNode }[] = [
  { content: <><P d="M905 66c-14-24-44-8-32 15 7 13 25 21 36 30 10-10 29-18 34-33 8-24-23-36-38-12Z" /><P d="M928 52c8-20 36-12 32 8-3 15-18 24-28 32" /></> },
  { content: <><P d="M592 152c-8-26-58-38-96-24-30 11-34 39-6 51 32 14 82 8 90-14 6-18-24-30-50-26-20 3-32 14-22 24 9 9 36 8 40-2" /><P d="M462 128c-9 15-7 32 6 46" /></> },
  { content: <><P d="M950 172c-16-8-14-30 6-30 2-22 34-28 44-8 14-16 44-8 40 14 18 2 24 24 8 32-10 4-20 2-30 0-20 6-50 4-68-8Z" /><P d="M968 214l-8 13M1000 218l-8 13M1032 216l-8 13" /></> },
  { content: <P d={star(432, 244)} /> },
  { content: <><P d="M560 376c-24-14-8-36-26-52-14-12-34-14-30-34 2-14-8-22-14-38" /><P d="M470 274l18-28 26 18" /></> },
  { content: <><P d="M372 372c-26-16-44-38-30-56 12-14 30-6 32 8 6-16 28-20 36-4 10 22-20 40-38 52Z" /><P d="M372 372c0 18 14 30 34 34 18 4 30 14 34 32" /></> },
  { content: <><P d="M1000 300 1008 318 1030 320 1014 333 1020 354 1000 343 980 354 986 333 970 320 992 318Z" /><P d="M966 362c6-22 12-36 22-50M990 372c6-22 14-36 28-48M1014 380c6-18 16-30 30-42" /></> },
  { content: <><P d="M214 420c-10-16 4-30 18-24 2-18 26-18 32-4 16-6 30 10 20 24 14 8 8 28-8 26-6 14-30 12-34-2-16 4-30-8-28-20Z" /><P d="M290 452c14 4 26 14 30 26" /></> },
  { content: <P d="M1122 318c-16-10-28-24-20-36 8-9 18-4 20 5 4-10 18-13 23-3 6 14-11 26-23 34Z" /> },
  { content: <P d="M330 462c-8-4-6-16 4-16 12 0 14 18 2 22-14 4-24-10-18-24" /> },
  { className: "am-doodle--fill", content: <P d={star(1152, 424, 0.9)} /> },
  { className: "am-doodle--fill", content: <P d={star(358, 566, 0.9)} /> },
  { className: "am-doodle--arc", content: <><P d="M422 470 462 532 532 506 472 578 420 534" /><Node cx={422} cy={470} /><Node cx={462} cy={532} /><Node cx={532} cy={506} /><Node cx={472} cy={578} /><Node cx={420} cy={534} /></> },
  { content: <><Node cx={1272} cy={442} r={34} /><P d="M1228 472c-20 11-22 19-6 17 30-3 72-27 96-52 10-12 6-16-8-12" /></> },
  { content: <><P d="M1060 590c20-28 40-54 46-96" /><P d="M1100 514c14-14 34-14 40-4-12 12-30 14-40 4Z" /><P d="M1086 546c14-12 30-12 36-2-12 10-26 12-36 2Z" /></> },
  { className: "am-doodle--arc", content: <P d="M430 628c10-42 20-48 22-20 2 22 14 22 20-6 6-26 14-26 18 0 4 20 16 18 24-6" /> },
  { content: <P d="M1236 584 1328 542 1298 624 1278 594ZM1278 594 1328 542" /> },
  { content: <P d="M244 594c40-20 70 10 110 6 26-4 38 14 56 30" /> },
  { content: <P d="M1140 628c30-20 60 18 90 6 22-10 36-24 56-20" /> },
];

export default function HeroDoodles() {
  return (
    <svg className="am-hero__doodles" viewBox="0 0 1440 650" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {drawings.map(({ className, content }, index) => (
        <g
          key={index}
          className={className ? `am-doodle ${className}` : "am-doodle"}
          style={{ "--i": index } as CSSProperties}
        >
          {content}
        </g>
      ))}
    </svg>
  );
}
