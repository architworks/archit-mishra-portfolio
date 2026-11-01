"use client";
import { Fragment, useState } from "react";
import { MarqueeStar, Pause, Play } from "@/components/icons";
import { skills } from "@/data/site";

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <div className="am-marquee__track" aria-hidden={hidden}>
      {skills.map((skill) => (
        <Fragment key={skill}>
          <span>{skill}</span>
          <MarqueeStar />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="am-wrap">
      <div className="am-marquee" data-paused={paused}>
        <div className="am-marquee__strip">
          <Track />
          <Track hidden />
        </div>
        <button
          className="am-marquee__pause"
          type="button"
          aria-label={paused ? "Play skills ticker" : "Pause skills ticker"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play /> : <Pause />}
        </button>
      </div>
    </div>
  );
}
