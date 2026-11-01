import Link from "next/link";
import Readout from "@/components/Readout";
import { roles } from "@/data/site";

export default function Experience() {
  return (
    <section className="am-section" id="resume">
      <div className="am-wrap">
        <div className="am-sec-head am-sec-head--center">
          <h2 className="am-h2"><em className="am-accent">Audit-Grade</em> Experience</h2>
        </div>
        <ol className="am-timeline">
          {roles.map((role) => (
            <li key={role.org} className="am-timeline__row" data-current={role.current ? true : undefined}>
              <div className="am-timeline__org">
                <h3>{role.org}</h3>
                <p className="am-timeline__when">{role.when}</p>
              </div>
              <div className="am-timeline__rail"><span className="am-timeline__dot" /></div>
              <div className="am-timeline__role">
                <h3>
                  <span className="am-nb">{role.title}</span>{" "}
                  <span className="am-nb">{role.focus}</span>
                </h3>
                <p>{role.summary}</p>
                <Readout items={role.readout} />
              </div>
            </li>
          ))}
        </ol>
        <div className="am-timeline-more">
          <Link className="am-btn am-btn--ghost am-btn--sm" href="/resume">View Full Resume</Link>
        </div>
      </div>
    </section>
  );
}
