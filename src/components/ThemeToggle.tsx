"use client";
import { Moon, Sun } from "@/components/icons";

export default function ThemeToggle() {
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button className="am-icon-btn" type="button" aria-label="Switch color theme" onClick={toggle}>
      <Sun className="am-theme-icon--sun" />
      <Moon className="am-theme-icon--moon" />
    </button>
  );
}
