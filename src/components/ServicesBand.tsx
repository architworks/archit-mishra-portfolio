import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";
import { services } from "@/data/site";

const diagrams: Record<string, ReactNode> = {
  "Agent Lab": (
    <svg viewBox="0 0 320 84" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M58 42H110M170 42l52-24M170 42l52 24" strokeDasharray="4 5" />
      <circle cx="36" cy="42" r="22" />
      <circle cx="140" cy="42" r="28" fill="var(--accent)" />
      <circle cx="244" cy="18" r="16" />
      <circle cx="244" cy="66" r="16" />
      <path d="M28 42h16M132 42h16M140 34v16M238 18h12M238 66h12" />
    </svg>
  ),
  "Evaluation Bench": (
    <svg viewBox="0 0 320 84" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 74h312" />
      <path d="M4 62 54 54l50 6 50-22 50 8 50-30 58-8" />
      <circle cx="154" cy="38" r="5" fill="var(--accent)" />
      <circle cx="254" cy="16" r="5" fill="var(--accent)" />
    </svg>
  ),
};

export default function ServicesBand() {
  return (
    <section className="am-band" id="about">
      <div className="am-wrap">
        <div className="am-sec-head">
          <h2 className="am-h2">What I <em className="am-accent">Build</em></h2>
          <p style={{ color: "var(--band-ink)" }}>
            Beyond client work, I maintain a sandbox of agents, evaluation harnesses, and creative pipelines to keep my skills sharp.
          </p>
        </div>
        <div className="am-services">
          {services.map((service, index) => (
            <article key={service.title} className="am-service" data-active={index === 1 ? true : undefined}>
              <div className="am-service__head">
                <h3>{service.title}</h3>
                <p>{service.caption}</p>
              </div>
              <div className="am-service__deck am-notch">
                <div className="am-notch__media am-service__media">
                  {service.highlights.length ? (
                    <div className="am-frag" data-ui>
                      {diagrams[service.title]}
                      <ul>
                        {service.highlights.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ) : (
                    <Image
                      src="/images/photo-flt-6151.webp"
                      alt="Archit in a blazer on a street lined with flame trees"
                      fill
                      sizes="(max-width: 1023px) 100vw, 420px"
                    />
                  )}
                </div>
                <Link className="am-arrow" href={service.href} aria-label={`Open ${service.title}`}>
                  <ArrowUpRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
