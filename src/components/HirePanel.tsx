import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { contact, hireStats } from "@/data/site";

export default function HirePanel() {
  return (
    <section className="am-section am-section--flush" id="hire">
      <div className="am-wrap">
        <div className="am-hire">
          <div className="am-hire__figure">
            <div className="am-hire__arch" />
            <Image
              src="/images/archit-cutout.webp"
              alt="Archit Mishra"
              width={1585}
              height={1400}
              sizes="(max-width: 767px) 90vw, 560px"
            />
          </div>
          <div>
            <h2 className="am-h2">Why <em className="am-accent">Hire Me</em>?</h2>
            <p className="am-hire__lede">
              I help auditors and operators trust GenAI in production, shipping measurable wins while keeping governance, privacy, and uptime front and center.
            </p>
            <dl className="am-stats">
              {hireStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <a className="am-btn am-btn--ghost" href={`mailto:${contact.email}?subject=Working%20with%20Archit`}>
              Hire Me <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
