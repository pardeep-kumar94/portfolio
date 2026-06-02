"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/lib/notion";

export default function Skills({ skills, competencies }: { skills: Skill[]; competencies: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-paper)",
        padding: "10rem 4rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "var(--space-xl, 6rem)" }}>
          <span
            className="section-number"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6rem",
              fontWeight: 800,
              opacity: 0.05,
              color: "var(--color-paper)",
              display: "block",
              marginBottom: "-2rem",
              lineHeight: 1,
            }}
          >
            03
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              color: "var(--color-paper)",
              letterSpacing: "-0.02em",
              position: "relative",
            }}
          >
            Technical{" "}
            <em
              style={{
                color: "var(--color-accent)",
                fontStyle: "italic",
              }}
            >
              Arsenal.
            </em>
          </h2>
        </div>

        {/* Skills grid */}
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(245, 240, 232, 0.08)",
          }}
        >
          {skills.map((category, i) => (
            <motion.div
              key={category.title}
              className="skill-cell"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              style={{
                padding: "4rem",
                backgroundColor: "var(--color-ink)",
              }}
            >
              {/* Icon */}
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.4rem",
                  color: "var(--color-accent)",
                  opacity: 0.25,
                  marginBottom: "0.6rem",
                  lineHeight: 1,
                }}
              >
                {category.icon}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  margin: "0 0 var(--space-md, 2rem) 0",
                  color: "var(--color-paper)",
                }}
              >
                {category.title}
              </h3>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[
                  ...category.tags.filter((t) => category.primary.includes(t)),
                  ...category.tags.filter((t) => !category.primary.includes(t)),
                ].map((tag) => {
                  const isPrimary = category.primary.includes(tag);
                  return (
                    <SkillTag key={tag} tag={tag} isPrimary={isPrimary} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* What I Do Best */}
        <div style={{ marginTop: "6rem", paddingTop: "6rem", borderTop: "1px solid rgba(245, 240, 232, 0.08)" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 600,
              fontStyle: "italic",
              color: "var(--color-paper)",
              marginBottom: "var(--space-lg, 4rem)",
              letterSpacing: "0.02em",
            }}
          >
            What I Do Best
          </h3>
          <div
            className="competencies-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.5rem 2rem",
            }}
          >
            {competencies.map((item, i) => (
              <CompetencyItem key={item} index={i + 1} text={item} inView={inView} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillTag({ tag, isPrimary }: { tag: string; isPrimary: boolean }) {
  return (
    <span
      className="skill-tag"
      data-primary={isPrimary}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        padding: "0.45em 0.9em",
        borderRadius: "3px",
        border: isPrimary
          ? "1px solid var(--color-accent)"
          : "1px solid rgba(245, 240, 232, 0.12)",
        backgroundColor: isPrimary ? "rgba(196, 75, 43, 0.12)" : "transparent",
        color: isPrimary ? "var(--color-paper)" : "rgba(245, 240, 232, 0.55)",
        cursor: "default",
        transition: "border-color 0.18s ease, transform 0.18s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-accent)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isPrimary
          ? "var(--color-accent)"
          : "rgba(245, 240, 232, 0.12)";
        el.style.transform = "translateY(0)";
      }}
    >
      {tag}
    </span>
  );
}

function CompetencyItem({
  index,
  text,
  inView,
  delay,
}: {
  index: number;
  text: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.4 + delay, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.75rem",
        padding: "1.2rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        cursor: "default",
        transition: "padding-left 0.18s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.paddingLeft = "0";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          opacity: 0.6,
          color: "var(--color-accent)",
          minWidth: "1.8rem",
          flexShrink: 0,
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}
