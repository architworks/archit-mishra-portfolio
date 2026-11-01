"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BLOCKS =
  ".am-sec-head, .am-service, .am-timeline__row, .am-hire, .am-project-cover, .am-project-detail, .am-project-card, .am-result, .am-discuss, .am-marquee, .am-tile, .am-gallery-grid figure, .am-footer__cta";

// Each block rises in once as it enters the view. Blocks stay visible at rest,
// so a page that never runs this script is still complete.
export default function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        let index = 0;
        let sibling = entry.target.previousElementSibling;
        while (sibling) {
          index += 1;
          sibling = sibling.previousElementSibling;
        }
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 480,
            delay: Math.min(index, 3) * 70,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            fill: "backwards",
          }
        );
      }
    });

    document.querySelectorAll(BLOCKS).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
