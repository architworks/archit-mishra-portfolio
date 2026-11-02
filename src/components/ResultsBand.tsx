import Readout from "@/components/Readout";
import { results } from "@/data/site";

export default function ResultsBand() {
  return (
    <section className="am-band am-band--compact" id="results">
      <div className="am-wrap">
        <div className="am-sec-head am-sec-head--center">
          <h2 className="am-h2">Results That Speak for <em className="am-accent">Themselves</em></h2>
          <p style={{ color: "var(--band-ink)" }}>
            Measured outcomes from production work, reported as evaluated or audited at the time.
          </p>
        </div>
        <div className="am-results">
          {results.map((result) => (
            <article key={result.figure} className="am-result">
              <div className="am-result__top">
                <strong>{result.figure}</strong>
                <span className="am-result__who">{result.source[0]}<br />{result.source[1]}</span>
              </div>
              <p>{result.summary}</p>
              <Readout items={result.readout} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
