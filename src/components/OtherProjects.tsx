"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { OtherProject } from "@/lib/notion";

const CHIP_COLORS = [
  { bg: "#fde8e0", text: "#c44b2b" },
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#ede9fe", text: "#6d28d9" },
  { bg: "#fef9c3", text: "#854d0e" },
  { bg: "#ffedd5", text: "#c2410c" },
  { bg: "#fce7f3", text: "#9d174d" },
  { bg: "#f0fdf4", text: "#166534" },
];

// ─── Screenshot Gallery Modal ─────────────────────────────────────────────────

function Gallery({ screenshots, initialIndex, onClose }: { screenshots: string[]; initialIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initialIndex);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: 40,
          height: 40,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Main image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "80vw", maxHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshots[current]}
          alt={`Screenshot ${current + 1}`}
          style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 4 }}
        />
      </motion.div>

      {/* Counter */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", marginTop: "1rem" }}>
        {current + 1} / {screenshots.length}
      </p>

      {/* Thumbnails */}
      {screenshots.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                padding: 0,
                border: i === current ? "2px solid var(--color-accent)" : "2px solid transparent",
                borderRadius: 4,
                cursor: "pointer",
                background: "transparent",
                opacity: i === current ? 1 : 0.5,
                transition: "opacity 0.15s ease, border-color 0.15s ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Thumb ${i + 1}`} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 2, display: "block" }} />
            </button>
          ))}
        </div>
      )}

      {/* Prev / Next arrows */}
      {screenshots.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => Math.max(0, c - 1)); }}
            style={{
              position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: 44, height: 44, cursor: current > 0 ? "pointer" : "default",
              opacity: current > 0 ? 1 : 0.2, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => Math.min(screenshots.length - 1, c + 1)); }}
            style={{
              position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: 44, height: 44, cursor: current < screenshots.length - 1 ? "pointer" : "default",
              opacity: current < screenshots.length - 1 ? 1 : 0.2, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, inView, delay }: { project: OtherProject; inView: boolean; delay: number }) {
  const [gallery, setGallery] = useState<number | null>(null);

  return (
    <>
      <motion.div
        className="other-project-card"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          backgroundColor: "var(--color-paper)",
          border: "1px solid var(--color-whisper)",
          borderRadius: 2,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          transition: "border-color 0.22s ease, box-shadow 0.22s ease",
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
        {/* Title + link */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--color-ink)", margin: 0, lineHeight: 1.3 }}>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--color-accent)", paddingBottom: "1px" }}
              >
                {project.title}
              </a>
            ) : project.title}
          </h3>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
              aria-label="Visit project"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>

        {/* Description */}
        {project.description && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--color-slate)", margin: 0, lineHeight: 1.65 }}>
            {project.description}
          </p>
        )}

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {project.screenshots.slice(0, 3).map((src, i) => (
              <button
                key={i}
                onClick={() => setGallery(i)}
                style={{
                  padding: 0, border: "1px solid var(--color-whisper)", borderRadius: 4,
                  cursor: "pointer", background: "transparent", overflow: "hidden",
                  transition: "border-color 0.18s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-whisper)")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Screenshot ${i + 1}`} style={{ width: 72, height: 52, objectFit: "cover", display: "block" }} />
                {i === 2 && project.screenshots.length > 3 && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#fff", fontWeight: 600,
                  }}>
                    +{project.screenshots.length - 3}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Stack chips */}
        {project.stack.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
            {project.stack.map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.03em",
                  padding: "0.3em 0.75em",
                  borderRadius: "999px",
                  background: CHIP_COLORS[i % CHIP_COLORS.length].bg,
                  color: CHIP_COLORS[i % CHIP_COLORS.length].text,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Gallery modal */}
      <AnimatePresence>
        {gallery !== null && (
          <Gallery screenshots={project.screenshots} initialIndex={gallery} onClose={() => setGallery(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function OtherProjects({ projects, sectionNumber = 3 }: { projects: OtherProject[]; sectionNumber?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!projects.length) return null;

  return (
    <section
      id="other-projects"
      ref={ref}
      className="other-projects-section"
      style={{ backgroundColor: "var(--color-cream)", padding: "10rem 4rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "6rem" }}>
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
            Other <em style={{ fontStyle: "italic" }}>Projects.</em>
          </h2>
        </div>

        {/* Grid */}
        <div
          className="other-projects-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} inView={inView} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
