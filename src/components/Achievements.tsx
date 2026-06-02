"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Achievement } from "@/lib/notion";

const COLS = 3;

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const rows = Math.ceil(achievements.length / COLS);

  return (
    <section
      id="achievements"
      ref={ref}
      className="achievements-section"
      style={{
        backgroundColor: "var(--color-paper)",
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
            01
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
            Numbers I&rsquo;ve{" "}
            <em style={{ fontStyle: "italic" }}>moved.</em>
          </h2>
        </div>

        {/* Achievement grid */}
        <div style={{ border: "1px solid var(--color-whisper)" }}>
          <motion.div
            className="achievements-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}
          >
            {achievements.map((item, i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              const isLastCol = col === COLS - 1;
              const isLastRow = row === rows - 1;

              return (
                <motion.div
                  key={i}
                  className="achievement-cell"
                  variants={cardVariants}
                  style={{
                    borderRight: !isLastCol
                      ? `1px solid var(--color-whisper)`
                      : "none",
                    borderBottom: !isLastRow
                      ? `1px solid var(--color-whisper)`
                      : "none",
                    padding: "4rem 2rem",
                    cursor: "default",
                    transition: "background-color 0.2s ease",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.015)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 5vw, 3.8rem)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "var(--color-ink)",
                      margin: "0 0 1rem",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.number}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      margin: "0 0 0.3rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "var(--color-slate)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
