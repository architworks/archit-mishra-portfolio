"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroDoodles from "@/components/HeroDoodles";
import { ArrowUpRight, QuoteMark, Spark, SparkLarge } from "@/components/icons";

type Role = "projects" | "photo";

const portfolios: { role: Role; href: string; label: string }[] = [
  { role: "projects", href: "/projects", label: "Projects" },
  { role: "photo", href: "/photography", label: "Photography" },
];

export default function Hero() {
  const [role, setRole] = useState<Role>("projects");
  const [doodles, setDoodles] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // The doodles arrive once the headline has left the view, while the stage is still on screen.
  useEffect(() => {
    const title = titleRef.current;
    const stage = stageRef.current;
    if (!title || !stage) return;

    let titleVisible = 1;
    let stageVisible = 1;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === title) titleVisible = entry.intersectionRatio;
          else stageVisible = entry.intersectionRatio;
        }
        setDoodles(titleVisible < 0.2 && stageVisible > 0.55);
      },
      { rootMargin: "-88px 0px 0px 0px", threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.55, 0.6, 0.75, 1] }
    );
    observer.observe(title);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="am-hero" id="home" data-role={role} data-doodles={doodles}>
      <div className="am-hero__head">
        <p className="am-hello" style={{ margin: 0 }}>
          Hello!
          <span className="am-hello__spark"><Spark /></span>
        </p>
        <h1 ref={titleRef} className="am-hero__title">
          <span className="am-sr">I’m Archit, Data Scientist and Photographer</span>
          <span aria-hidden="true">
            I’m <em className="am-accent">Archit</em>,<br />
            <span className="am-role">
              <span>Data Scientist</span>
              <span>Photographer</span>
            </span>
          </span>
          <span className="am-hero__spark"><SparkLarge /></span>
        </h1>
      </div>

      <div ref={stageRef} className="am-hero__stage">
        <div className="am-hero__arc" />
        <HeroDoodles />
        <Image
          className="am-hero__cutout"
          src="/images/archit-cutout.webp"
          alt="Archit Mishra in sunglasses, a navy blazer and a red shirt"
          width={1585}
          height={1400}
          sizes="(max-width: 767px) 110vw, 740px"
          priority
        />
        <nav
          className="am-capsule"
          aria-label="Choose a portfolio"
          onPointerLeave={() => setRole("projects")}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setRole("projects");
          }}
        >
          <span className="am-capsule__thumb" />
          {portfolios.map((portfolio) => (
            <Link
              key={portfolio.role}
              href={portfolio.href}
              data-role={portfolio.role}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setRole(portfolio.role);
              }}
              onFocus={() => setRole(portfolio.role)}
            >
              {portfolio.label} <ArrowUpRight />
            </Link>
          ))}
        </nav>
      </div>

      <div className="am-hero__flanks">
        <blockquote className="am-hero__quote" style={{ margin: 0 }}>
          <QuoteMark />
          <p>I build intelligent products with LLMs and data.</p>
        </blockquote>
        <p className="am-hero__stat" style={{ margin: 0 }}>
          <strong>4+ Years</strong>
          <span>Shipping data and GenAI at AB InBev</span>
        </p>
      </div>
    </section>
  );
}
