import Image from "next/image";
import GetInTouch from "@/components/GetInTouch";
import { hireStats } from "@/data/site";

export default function HirePanel() {
  return (
    <section className="am-section am-section--flush" id="why">
      <div className="am-wrap">
        <div className="am-hire">
          <div className="am-hire__figure">
            <div className="am-hire__arch" />
            <Image
              src="/images/archit-cartoon-sweater.webp"
              alt="Cartoon of Archit in a cream sweater, waving"
              width={895}
              height={1002}
              sizes="(max-width: 767px) 80vw, 480px"
            />
          </div>
          <div>
            <h2 className="am-h2">Why <em className="am-accent">Work With Me</em>?</h2>
            <p className="am-hire__lede">
              I help teams trust AI in production, shipping agents with the guardrails, evals, and observability that turn a demo into measurable business value.
            </p>
            <dl className="am-stats">
              {hireStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <GetInTouch />
          </div>
        </div>
      </div>
    </section>
  );
}
