"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SummaryContent } from "@/lib/notion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

function get(content: SummaryContent[], key: string, fallback: string): string {
  return content.find((c) => c.key === key)?.content || fallback;
}

export default function Summary({ content }: { content: SummaryContent[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const paragraph1 = get(content, "paragraph_1", "esults-driven Senior React Native Developer with 9+ years of experience delivering production-grade cross-platform mobile applications for 1M+ users across beauty-tech, healthcare, and social media.");
  const paragraph2 = get(content, "paragraph_2", "Proven track record in performance engineering — crash-free rate from 76% to 99.4%, 71% app size reduction, 4.6× frame rate improvement. Deep expertise across the full React Native ecosystem, CI/CD pipelines, and bridging native modules — shipping clean, maintainable code that scales.");
  const pullQuote = get(content, "pull_quote", "From 76% to 99.4% crash-free. That's not optimization — that's transformation.");

  return (
    <section
      id="summary"
      ref={ref}
      className="summary-section w-full"
      style={{
        backgroundColor: "var(--color-paper)",
        padding: "var(--space-2xl) var(--space-lg)",
      }}
    >
      <div
        className="summary-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 300px",
          gap: "4rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ── Column 1: Section label ── */}
        <motion.div
          className="summary-label-col"
          style={{ justifySelf: "center", paddingTop: "1rem" }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              textTransform: "uppercase",
              userSelect: "none",
              display: "inline-block",
            }}
          >
            The Profile
          </span>
        </motion.div>

        {/* ── Column 2: Main body text with drop cap ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.15}
        >
          {/* First paragraph with drop cap */}
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-charcoal)",
              fontSize: "1.15rem",
              lineHeight: "1.8",
            }}
          >
            {/* Drop cap "R" */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-accent)",
                fontSize: "5rem",
                lineHeight: "0.8",
                float: "left",
                marginRight: "0.15em",
                marginTop: "0.05em",
                marginBottom: "-0.05em",
                fontWeight: 700,
                userSelect: "none",
              }}
            >
              R
            </span>
            {paragraph1}
          </p>

          {/* Second paragraph */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-charcoal)",
              fontSize: "1.15rem",
              lineHeight: "1.8",
            }}
          >
            {paragraph2}
          </p>
        </motion.div>

        {/* ── Column 3: Pull quote ── */}
        <motion.aside
          className="summary-pullquote"
          style={{ alignSelf: "start", padding: "2rem", borderLeft: "3px solid var(--color-accent)" }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
        >
          <blockquote>
            <p
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
                fontSize: "1.3rem",
                fontWeight: 500,
                lineHeight: "1.5",
                fontStyle: "italic",
              }}
            >
              &ldquo;{pullQuote}&rdquo;
            </p>
          </blockquote>
        </motion.aside>
      </div>
    </section>
  );
}
