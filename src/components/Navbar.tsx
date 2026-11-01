"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#skills", label: "About" },
  { href: "/#resume", label: "Resume" },
  { href: "/projects", label: "Project" },
  { href: "/photography", label: "Photography" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Track which section is in view on the homepage for hash links
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (pathname !== "/") return; // Only run scroll spy on home page

    const ids = ["home", "skills", "resume", "contact"]; // sections that exist
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most visible near the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
        // If nothing is intersecting (e.g., scrolled to very top), default to home
        if (!visible) setActiveSection("home");
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // utility to decide if a nav item should be highlighted
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeSection === "home";
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      return pathname === "/" && activeSection === id;
    }
    return pathname.startsWith(href);
  };
  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="navbar-surface relative rounded-full text-white backdrop-blur-xl ring-1 ring-white/10 shadow-2xl">
          <ul className="flex items-center justify-between px-3">
            {/* Left cluster */}
            <div className="flex items-center">
              {navItems.slice(0,3).map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label} className="p-1">
                    <Link
                      href={item.href}
                      className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "text-white" : "text-white/90 hover:text-white"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-[26px] md:rounded-[30px] bg-orange-600 ring-1 ring-orange-500/20 shadow-lg" />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </div>

            {/* Center logo */}
            <li className="pointer-events-none select-none">
              <div className="flex items-center gap-2 py-2 px-4">
                <Image src="/logo-mark.svg" alt="logo" width={28} height={28} className="h-7 w-7" />
                <span className="font-semibold tracking-wide">GENAI</span>
              </div>
            </li>

            {/* Right cluster */}
            <div className="flex items-center">
              {navItems.slice(3).map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label} className="p-1">
                    <Link
                      href={item.href}
                      className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "text-white" : "text-white/90 hover:text-white"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-[26px] md:rounded-[30px] bg-orange-600 ring-1 ring-orange-500/20 shadow-lg" />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="pl-2 pr-1">
                <ThemeToggle />
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
