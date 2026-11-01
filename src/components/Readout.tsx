export default function Readout({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="am-readout">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}
