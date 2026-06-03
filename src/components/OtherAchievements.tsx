"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { OtherAchievement } from "@/lib/notion";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Award:        { bg: "#fef9c3", text: "#854d0e" },
  Certification: { bg: "#dbeafe", text: "#1d4ed8" },
  "Open Source": { bg: "#dcfce7", text: "#15803d" },
  Speaking:     { bg: "#ede9fe", text: "#6d28d9" },
  Other:        { bg: "#f3f4f6", text: "#374151" },
};

export default function OtherAchievements({ items, sectionNumber = 6 }: { items: OtherAchievement[]; sectionNumber?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!items.length) return null;

  return (
    <section
      id="other-achievements"
      ref={ref}
      className="other-achievements-section"
      style={{
        backgroundColor: "var(--color-cream)",
        padding: "10rem 4rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "6rem", position: "relative" }}>
          <span
            className="section-number"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6rem",
              fontWeight: 800,
              lineHeight: 1,
              color: "var(--color-ink)",
              opacity: 0.08,
              display: "block",
              userSelect: "none",
              marginBottom: "-2rem",
            }}
          >
            {String(sectionNumber).padStart(2, "0")}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              position: "relative",
            }}
          >
            My <em style={{ fontStyle: "italic" }}>Achievements.</em>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="other-achievements-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {items.map((item, i) => {
            const color = CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS["Other"];
            return (
              <motion.div
                key={i}
                className="other-achievement-card"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                style={{
                  backgroundColor: "var(--color-paper)",
                  border: "1px solid var(--color-whisper)",
                  borderRadius: "2px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  transition: "border-color 0.22s ease, box-shadow 0.22s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-accent)";
                  el.style.boxShadow = "0 4px 24px rgba(196,75,43,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-whisper)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Category badge + year */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                  {item.category && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "0.25em 0.7em",
                        borderRadius: "2px",
                        backgroundColor: color.bg,
                        color: color.text,
                        fontWeight: 600,
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                  {item.year && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--color-slate)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.year}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--color-accent)",
                        paddingBottom: "1px",
                      }}
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>

                {/* Issuer */}
                {item.issuer && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-accent)",
                      margin: 0,
                    }}
                  >
                    {item.issuer}
                  </p>
                )}

                {/* Description */}
                {item.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "var(--color-slate)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
