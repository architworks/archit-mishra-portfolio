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
  const topRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // The doodles arrive with the first bit of scroll and leave once the stage is mostly gone.
  useEffect(() => {
    const top = topRef.current;
    const stage = stageRef.current;
    if (!top || !stage) return;

    let atTop = true;
    let stageVisible = 1;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === top) atTop = entry.isIntersecting;
          else stageVisible = entry.intersectionRatio;
        }
        setDoodles(!atTop && stageVisible > 0.35);
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.75, 1] }
    );
    observer.observe(top);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sits at the very top of the document, so it leaves the view on the first scroll. */}
      <div ref={topRef} aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: 1, height: 6, pointerEvents: "none" }} />
      <section className="am-hero" id="home" data-role={role} data-doodles={doodles}>
        <div className="am-hero__head">
          <p className="am-hello" style={{ margin: 0 }}>
            Hello!
            <span className="am-hello__spark"><Spark /></span>
          </p>
          <h1 className="am-hero__title">
            <span className="am-sr">I’m Archit, AI Engineer and Photographer</span>
            <span aria-hidden="true">
              I’m <em className="am-accent">Archit</em>,<br />
              <span className="am-role">
                <span>AI Engineer</span>
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
            <span>Shipping production AI, now at Oracle</span>
          </p>
        </div>
      </section>
    </>
  );
}
