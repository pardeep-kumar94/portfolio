"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const educationData = [
  {
    year: "2015",
    degree: "B.Tech, Information Technology",
    institution: "Punjab Technical University",
  },
  {
    year: "2009",
    degree: "Diploma, Information Technology",
    institution: "Punjab Technical University",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="education-section"
      style={{
        backgroundColor: "var(--color-paper)",
        color: "var(--color-ink)",
        padding: "10rem 4rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "6rem" }}>
          <span
            className="section-number"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6rem",
              fontWeight: 800,
              opacity: 0.08,
              color: "var(--color-ink)",
              display: "block",
              marginBottom: "-2rem",
              lineHeight: 1,
            }}
          >
            04
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              color: "var(--color-ink)",
              letterSpacing: "-0.02em",
              position: "relative",
            }}
          >
            Education
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="edu-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "4rem",
          }}
        >
          {educationData.map((item, i) => (
            <EducationCard
              key={item.year}
              {...item}
              inView={inView}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  year,
  degree,
  institution,
  inView,
  delay,
}: {
  year: string;
  degree: string;
  institution: string;
  inView: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="edu-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "4rem",
        border: "1px solid var(--color-whisper)",
        borderRadius: "2px",
        backgroundColor: "var(--color-paper)",
        transition: "border-color 0.22s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-whisper)";
      }}
    >
      {/* Watermark year */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "1rem",
          right: "2rem",
          fontFamily: "var(--font-display)",
          fontSize: "4rem",
          fontWeight: 800,
          lineHeight: 1,
          color: "var(--color-ink)",
          opacity: 0.06,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {year}
      </span>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-accent)",
            letterSpacing: "0.12em",
            display: "block",
            marginBottom: "1.2rem",
          }}
        >
          {year}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "var(--color-ink)",
            margin: "0 0 0.5rem 0",
            lineHeight: 1.3,
          }}
        >
          {degree}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            color: "var(--color-slate)",
            margin: 0,
          }}
        >
          {institution}
        </p>
      </div>
    </motion.div>
  );
}
