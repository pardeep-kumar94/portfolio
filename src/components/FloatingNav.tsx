"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "cover", label: "Cover" },
  { id: "summary", label: "Summary" },
  { id: "achievements", label: "Achievements" },
  { id: "experience", label: "Experience" },
  { id: "casestudies", label: "Case Studies" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function FloatingNav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Clean up previous observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    const visibilityMap = new Map<string, number>();

    const updateActive = () => {
      let maxRatio = -1;
      let bestId = NAV_ITEMS[0].id;
      visibilityMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestId = id;
        }
      });
      setActiveId(bestId);
    };

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(id, entry.intersectionRatio);
          });
          updateActive();
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], rootMargin: "0px" }
      );

      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => {
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current = [];
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        mixBlendMode: "difference",
      }}
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            aria-label={label}
            onClick={() => handleClick(id)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.2rem",
              height: "1.2rem",
            }}
          >
            <motion.span
              animate={{
                scale: isActive ? 1.4 : 1,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                display: "block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
