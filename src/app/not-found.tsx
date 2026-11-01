import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="am-wrap am-empty-page">
      <h1 className="am-h2">This Page Is <em className="am-accent">Out of Frame</em></h1>
      <p>The link may be old, or the page may have moved.</p>
      <Link className="am-btn am-btn--primary" href="/">Go to the Home Page</Link>
    </div>
  );
}
