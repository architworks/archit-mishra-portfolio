"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Close, Menu } from "@/components/icons";
import { navLeft, navRight } from "@/data/site";

export function Brand() {
  return (
    <Link className="am-nav__brand" href="/" aria-label="Archit Mishra, home">
      <span translate="no">Archit Mishra</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Track which section is in view on the homepage for hash links
  useEffect(() => {
    if (pathname !== "/") return;

    const elements = ["home", "about", "resume", "hire", "projects", "results", "contact", "photography"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeSection === "home";
    if (href.startsWith("/#")) return pathname === "/" && activeSection === href.slice(2);
    return pathname.startsWith(href);
  };

  const renderLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      key={href}
      className="am-nav__link"
      href={href}
      aria-current={isActive(href) ? "page" : undefined}
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />
      <header ref={headerRef} className="am-nav" data-scrolled={scrolled}>
        <nav className="am-nav__bar" aria-label="Main">
          <div className="am-nav__group">{navLeft.map(renderLink)}</div>
          <Brand />
          <div className="am-nav__group am-nav__group--end">
            {navRight.map(renderLink)}
            <ThemeToggle />
          </div>
          <div className="am-nav__menu">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              className="am-icon-btn"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>
        <nav id="mobile-nav" className="am-sheet-nav" data-open={open} aria-label="Mobile">
          {[...navLeft, ...navRight].map(renderLink)}
        </nav>
      </header>
    </>
  );
}
