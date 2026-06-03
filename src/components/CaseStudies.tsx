"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudy, CaseStudyContent } from "@/lib/notion";

// ─── Types ────────────────────────────────────────────────────────────────────

// A spread is either the TOC, the first page of a case study (preface/cover), or a content page
type SpreadInfo =
  | { type: "toc" }
  | { type: "case-first"; studyIndex: number; study: CaseStudy; chapterNum: number; totalPagesInChapter: number; pageInChapter: number }
  | { type: "case-content"; studyIndex: number; study: CaseStudy; content: CaseStudyContent; chapterNum: number; totalPagesInChapter: number; pageInChapter: number };

function buildSpreads(studies: CaseStudy[]): SpreadInfo[] {
  const spreads: SpreadInfo[] = [{ type: "toc" }];
  studies.forEach((study, i) => {
    const contents = study.contents ?? [];
    const totalPages = 1 + contents.length;
    spreads.push({ type: "case-first", studyIndex: i, study, chapterNum: i + 1, totalPagesInChapter: totalPages, pageInChapter: 1 });
    contents.forEach((content, ci) => {
      spreads.push({ type: "case-content", studyIndex: i, study, content, chapterNum: i + 1, totalPagesInChapter: totalPages, pageInChapter: ci + 2 });
    });
  });
  return spreads;
}

// ─── Divine Particles Background ─────────────────────────────────────────────
function DivineParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    interface P {
      x: number; y: number; size: number;
      vy: number; vx: number; opacity: number;
      fadeDir: number; glow: number;
      color: { r: number; g: number; b: number };
      phase: number;
    }

    const colors = [
      { r: 255, g: 200, b: 80 }, { r: 255, g: 160, b: 60 },
      { r: 196, g: 75, b: 43 }, { r: 255, g: 220, b: 150 },
      { r: 180, g: 130, b: 255 }, { r: 255, g: 180, b: 120 },
      { r: 120, g: 200, b: 255 },
    ];

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const ps: P[] = Array.from({ length: 120 }, () => {
      const c = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * W(), y: Math.random() * H(),
        size: Math.random() * 3.5 + 0.8,
        vy: -(Math.random() * 0.5 + 0.15),
        vx: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        glow: Math.random() * 20 + 10,
        color: c, phase: Math.random() * Math.PI * 2,
      };
    });

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      t += 0.01;
      for (const p of ps) {
        const { r, g, b } = p.color;
        ctx.save();
        ctx.globalAlpha = p.opacity * 0.25;
        ctx.shadowBlur = p.glow * 2;
        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.fillStyle = `rgba(${r},${g},${b},0.4)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = p.opacity * 0.9;
        ctx.fillStyle = `rgba(${Math.min(r + 60, 255)},${Math.min(g + 60, 255)},${Math.min(b + 40, 255)},1)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 2 + p.phase) * 0.3;
        p.opacity += p.fadeDir * 0.004;
        if (p.opacity > 0.8) p.fadeDir = -1;
        if (p.opacity < 0.1) p.fadeDir = 1;
        if (p.y < -20) { p.y = H() + 20; p.x = Math.random() * W(); }
        if (p.x < -20) p.x = W() + 20;
        if (p.x > W() + 20) p.x = -20;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Grain SVG ────────────────────────────────────────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.35'/%3E%3C/svg%3E")`;

// ─── Paper texture SVG ────────────────────────────────────────────────────────
const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23p)' opacity='0.03'/%3E%3C/svg%3E")`;

// ─── Book Cover (Closed State) ────────────────────────────────────────────────
function BookCover({ title, label, coverImage, subtitle, onClick }: { title: string; label?: string; coverImage?: string; subtitle: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ perspective: "2000px" }}>
        <motion.div
          onClick={onClick}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ rotateY: hovered ? -8 : 0, rotateX: hovered ? 2 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            width: 280, height: 420,
            transformStyle: "preserve-3d",
            cursor: "pointer", position: "relative",
          }}
        >
          {/* Spine */}
          <div style={{
            position: "absolute", left: -18, top: 0, width: 18, height: "100%",
            background: "var(--color-charcoal)",
            transform: "rotateY(90deg)", transformOrigin: "right center",
            borderRadius: "2px 0 0 2px",
          }} />

          {/* Front cover */}
          <div style={{
            position: "absolute", inset: 0,
            background: coverImage ? "transparent" : "var(--color-ink)",
            borderRadius: "0 4px 4px 0",
            boxShadow: "6px 6px 20px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.2), inset -2px 0 4px rgba(0,0,0,0.2)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            {/* Cover image */}
            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}

            {/* Overlay for image covers */}
            {coverImage && (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 100%)" }} />
            )}

            {/* Grain overlay */}
            {!coverImage && (
              <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_SVG, backgroundSize: "200px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
            )}

            {/* Decorative borders (text-only covers) */}
            {!coverImage && (
              <>
                <div style={{ position: "absolute", top: 20, left: 20, right: 20, height: 1, background: "linear-gradient(to right, transparent, rgba(196,75,43,0.5), transparent)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, height: 1, background: "linear-gradient(to right, transparent, rgba(196,75,43,0.5), transparent)" }} />
              </>
            )}

            {/* Text content */}
            <div style={{ position: "relative", textAlign: "center", color: "var(--color-paper)", padding: "2rem", marginTop: coverImage ? "auto" : 0 }}>
              {label && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.75rem" }}>{label}</p>
              )}
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem", whiteSpace: "pre-line" }}>{title}</h2>
              {!coverImage && (
                <>
                  <div style={{ width: 40, height: 2, background: "var(--color-accent)", margin: "0 auto 1rem" }} />
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontStyle: "italic", opacity: 0.6 }}>Pardeep Kumar</p>
                </>
              )}
            </div>

            {/* Tap hint */}
            <motion.p
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ position: "absolute", bottom: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-paper)" }}
            >
              Tap to open
            </motion.p>
          </div>
        </motion.div>
      </div>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em",
        textTransform: "uppercase", color: "var(--color-charcoal)", opacity: 0.6,
      }}>
        {subtitle}
      </p>
    </div>
  );
}

// ─── Left/Right Page Content ─────────────────────────────────────────────────
function LeftPageContent({ spread, spreads, onNavigate, bookContents }: { spread: SpreadInfo; spreads: SpreadInfo[]; onNavigate?: (target: number) => void; bookContents?: import("@/lib/notion").CaseStudyContent[] }) {
  if (spread.type === "toc") return <TOCLeft spreads={spreads} onNavigate={onNavigate} bookContents={bookContents} />;
  if (spread.type === "case-first") return <CaseStudyLeft study={spread.study} pageNum={spread.chapterNum} pageInChapter={spread.pageInChapter} totalPages={spread.totalPagesInChapter} />;
  return <ContentPageLeft content={spread.content} chapterNum={spread.chapterNum} pageInChapter={spread.pageInChapter} totalPages={spread.totalPagesInChapter} />;
}

function RightPageContent({ spread, spreads, bookPreface }: { spread: SpreadInfo; spreads: SpreadInfo[]; bookPreface?: import("@/lib/notion").CaseStudyPreface }) {
  if (spread.type === "toc") return <TOCRight count={spreads.filter(s => s.type === "case-first").length} preface={bookPreface} />;
  if (spread.type === "case-first") return <CaseStudyRight study={spread.study} isLast={spread.totalPagesInChapter === 1} />;
  return <ContentPageRight content={spread.content} study={spread.study} isLast={spread.pageInChapter === spread.totalPagesInChapter} />;
}

function TOCEntry({ content, index, prefix, spreadIndex, onNavigate, depth = 0 }: {
  content: import("@/lib/notion").CaseStudyContent;
  index: number;
  prefix: string;
  spreadIndex: Map<string, number>;
  onNavigate?: (target: number) => void;
  depth?: number;
}) {
  const num = prefix ? `${prefix}.${index}` : `${index}`;
  const spreadIdx = spreadIndex.get(content.id);
  return (
    <>
      <div
        onClick={() => spreadIdx !== undefined && onNavigate?.(spreadIdx)}
        style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          padding: depth === 0 ? "0.8rem 0.5rem" : "0.45rem 0.5rem 0.45rem 1.5rem",
          borderBottom: depth === 0 ? "1px solid rgba(0,0,0,0.05)" : "none",
          cursor: spreadIdx !== undefined ? "pointer" : "default",
          transition: "padding-left 0.2s ease, background 0.2s ease",
          borderRadius: 2,
        }}
        onMouseEnter={(e) => {
          if (spreadIdx !== undefined) {
            e.currentTarget.style.paddingLeft = depth === 0 ? "1rem" : "2rem";
            e.currentTarget.style.background = "rgba(196,75,43,0.04)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.paddingLeft = depth === 0 ? "0.5rem" : "1.5rem";
          e.currentTarget.style.background = "transparent";
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: depth === 0 ? "0.75rem" : "0.65rem",
          color: "var(--color-accent)", opacity: depth === 0 ? 0.7 : 0.5,
          minWidth: depth === 0 ? "1.5rem" : "2.5rem", fontStyle: depth === 0 ? "italic" : "normal",
          fontWeight: depth === 0 ? 600 : 400,
        }}>{num}</span>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: depth === 0 ? "0.9rem" : "0.8rem",
          fontWeight: depth === 0 ? 500 : 400, color: depth === 0 ? "var(--color-ink)" : "var(--color-charcoal)",
          flex: 1,
        }}>{content.title}</span>
        <span style={{ flex: 1, borderBottom: "1px dotted var(--color-whisper)", minWidth: 12, alignSelf: "flex-end", marginBottom: "0.3rem" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)", opacity: 0.4 }}>→</span>
      </div>
      {content.children?.map((child, ci) => (
        <TOCEntry key={child.id} content={child} index={ci + 1} prefix={num} spreadIndex={spreadIndex} onNavigate={onNavigate} depth={depth + 1} />
      ))}
    </>
  );
}

function TOCLeft({ spreads, onNavigate, bookContents }: { spreads: SpreadInfo[]; onNavigate?: (target: number) => void; bookContents?: import("@/lib/notion").CaseStudyContent[] }) {
  // Map content id → spread index for navigation
  const contentSpreadIndex = new Map<string, number>();
  spreads.forEach((s, i) => {
    if (s.type === "case-content") contentSpreadIndex.set(s.content.id, i);
  });

  const entries = bookContents ?? [];

  return (
    <div style={{ padding: "3.5rem 3rem 3.5rem 3.5rem", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1.5rem", flexShrink: 0 }}>Contents</p>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2rem", color: "var(--color-ink)", flexShrink: 0 }}>Table of Contents</h3>
      <div style={{ display: "flex", flexDirection: "column", overflowY: "auto", flex: 1 }}>
        {entries.length === 0 && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)", opacity: 0.4 }}>No chapters yet.</p>
        )}
        {entries.map((content, i) => (
          <TOCEntry key={content.id} content={content} index={i + 1} prefix="" spreadIndex={contentSpreadIndex} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function TOCRight({ count, preface }: { count: number; preface?: import("@/lib/notion").CaseStudyPreface }) {
  const quote = preface?.content || "";
  const author = preface?.author || "";
  return (
    <div style={{ padding: "3.5rem 3.5rem 3.5rem 3rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {quote && (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--color-charcoal)", marginBottom: author ? "1rem" : "3rem" }}>
          {quote}
        </p>
      )}
      {author && (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontStyle: "italic", color: "var(--color-slate)", marginBottom: "3rem" }}>
          — {author}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 800, opacity: 0.05, lineHeight: 1 }}>{count}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-slate)", opacity: 0.5 }}>Case Studies</span>
      </div>
    </div>
  );
}

function CaseStudyLeft({ study, pageNum }: { study: CaseStudy; pageNum: number; pageInChapter: number; totalPages: number }) {
  const preface = study.preface;
  return (
    <div style={{ padding: "3.5rem 3rem 3.5rem 3.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>
        Chapter {String(pageNum).padStart(2, "0")}
      </p>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.5rem", color: "var(--color-ink)" }}>
        {study.title}
      </h3>
      {study.label && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--color-slate)", marginBottom: "2rem" }}>
          {study.label}
        </p>
      )}
      {preface && (
        <>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-charcoal)", textAlign: "justify", flex: 1 }}>
            {preface.content}
          </p>
          {preface.author && (
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontStyle: "italic", color: "var(--color-slate)", marginTop: "1.5rem" }}>
              — {preface.author}
            </p>
          )}
        </>
      )}
      {!preface && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-charcoal)", opacity: 0.5, flex: 1 }}>
          Open the pages to explore this case study.
        </p>
      )}
    </div>
  );
}

function CaseStudyRight({ study, isLast }: { study: CaseStudy; isLast: boolean }) {
  const contentsCount = study.contents?.length ?? 0;
  return (
    <div style={{ padding: "3.5rem 3.5rem 3.5rem 3rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {contentsCount > 0 ? (
        <>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic", color: "var(--color-charcoal)", lineHeight: 1.6, marginBottom: "2rem" }}>
            {contentsCount} chapter{contentsCount !== 1 ? "s" : ""} inside
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {study.contents.map((c, i) => (
              <li key={c.id} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline", padding: "0.6rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-accent)", opacity: 0.6 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--color-charcoal)" }}>{c.title}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic", color: "var(--color-charcoal)", opacity: 0.4 }}>
          No chapters yet.
        </p>
      )}
      {!isLast && (
        <p style={{ marginTop: "auto", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-slate)", opacity: 0.5, textAlign: "right" }}>
          continued →
        </p>
      )}
    </div>
  );
}

function ContentPageLeft({ content, chapterNum, pageInChapter, totalPages }: { content: CaseStudyContent; chapterNum: number; pageInChapter: number; totalPages: number }) {
  return (
    <div style={{ padding: "3.5rem 3rem 3.5rem 3.5rem", height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1.5rem" }}>
        Chapter {String(chapterNum).padStart(2, "0")} — Page {pageInChapter}/{totalPages}
      </p>
      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.4rem" }}>
        {content.title}
      </h4>
      {content.subtitle && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--color-charcoal)", opacity: 0.7, marginBottom: "1.5rem" }}>
          {content.subtitle}
        </p>
      )}
      {content.sections.filter((_, i) => i % 2 === 0).map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}
    </div>
  );
}

function ContentPageRight({ content, study, isLast }: { content: CaseStudyContent; study: CaseStudy; isLast: boolean }) {
  const rightSections = content.sections.filter((_, i) => i % 2 === 1);
  return (
    <div style={{ padding: "3.5rem 3.5rem 3.5rem 3rem", height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {rightSections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}
      {rightSections.length === 0 && <div style={{ flex: 1 }} />}
      {!isLast && (
        <p style={{ marginTop: "auto", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-slate)", opacity: 0.5, textAlign: "right" }}>
          continued →
        </p>
      )}
    </div>
  );
}

function SectionBlock({ section }: { section: import("@/lib/notion").CaseStudyContentSection }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {section.title && (
        <h5 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "0.5rem" }}>
          {section.title}
        </h5>
      )}
      {section.text && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.75, color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>
          {section.text}
        </p>
      )}
      {section.type === "stats" && section.items.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
          {section.items.map((item, i) => (
            <div key={i} style={{ padding: "0.75rem", background: "rgba(196,75,43,0.06)", borderLeft: "2px solid var(--color-accent)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-accent)", lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-charcoal)", opacity: 0.7, marginTop: "0.25rem" }}>{item.label}</p>
            </div>
          ))}
        </div>
      )}
      {section.type === "bullet_points" && section.items.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {section.items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.4rem", alignItems: "baseline" }}>
              <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)" }}>
                {item.label && <strong style={{ color: "var(--color-ink)" }}>{item.label}: </strong>}{item.value}
              </span>
            </li>
          ))}
        </ul>
      )}
      {section.type === "image" && section.imageUrl && (
        <img src={section.imageUrl} alt={section.title} style={{ width: "100%", borderRadius: 4, objectFit: "cover", maxHeight: 180 }} />
      )}
    </div>
  );
}

// ─── Open Book — Immersive Reading Experience ─────────────────────────────────
function OpenBook({ studies, onClose, bookPreface, bookContents }: { studies: CaseStudy[]; onClose: () => void; bookPreface?: import("@/lib/notion").CaseStudyPreface; bookContents?: import("@/lib/notion").CaseStudyContent[] }) {
  const spreads = buildSpreads(studies);
  const totalSpreads = spreads.length - 1; // minus 1 because spread index is 0-based, last valid index
  const [spread, setSpread] = useState(0);
  const [flipState, setFlipState] = useState<"idle" | "flipping-forward" | "flipping-backward">("idle");
  const [nextSpread, setNextSpread] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [cornerHover, setCornerHover] = useState<"none" | "right" | "left">("none");

  const canFlip = flipState === "idle";
  const flipQueueRef = useRef<number[]>([]);

  const goForward = useCallback(() => {
    if (!canFlip) return;
    if (spread >= totalSpreads) { onClose(); return; }
    setNextSpread(spread + 1);
    setFlipState("flipping-forward");
  }, [canFlip, spread, totalSpreads, onClose]);

  const goBackward = useCallback(() => {
    if (!canFlip || spread <= 0) return;
    setNextSpread(spread - 1);
    setFlipState("flipping-backward");
  }, [canFlip, spread]);

  const onFlipComplete = () => {
    setSpread(nextSpread);
    setFlipState("idle");

    // Process queued flips for multi-page navigation
    if (flipQueueRef.current.length > 0) {
      const next = flipQueueRef.current.shift()!;
      setTimeout(() => {
        setNextSpread(next);
        setFlipState(next > nextSpread ? "flipping-forward" : "flipping-backward");
      }, 80);
    }
  };

  // Navigate to a specific spread with sequential page flips
  const goToSpread = useCallback((target: number) => {
    if (!canFlip || target === spread || target < 0 || target > totalSpreads) return;
    const direction = target > spread ? 1 : -1;
    // Build a queue of intermediate spreads
    const queue: number[] = [];
    for (let s = spread + direction; direction > 0 ? s <= target : s >= target; s += direction) {
      queue.push(s);
    }
    if (queue.length === 0) return;
    // Start first flip, queue the rest
    const first = queue.shift()!;
    flipQueueRef.current = queue;
    setNextSpread(first);
    setFlipState(direction > 0 ? "flipping-forward" : "flipping-backward");
  }, [canFlip, spread, totalSpreads]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goForward();
      else if (e.key === "ArrowLeft") goBackward();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goForward, goBackward, onClose]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) { delta > 0 ? goForward() : goBackward(); }
    touchStartX.current = null;
  };

  // Determine what the base (underneath) layer shows during a flip
  const baseLeftIndex = flipState === "flipping-forward" ? spread : flipState === "flipping-backward" ? nextSpread : spread;
  const baseRightIndex = flipState === "flipping-forward" ? nextSpread : flipState === "flipping-backward" ? spread : spread;

  return (
    <div
      style={{ width: "100%", maxWidth: 980, margin: "0 auto", position: "relative" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* The Book */}
      <div style={{
        position: "relative",
        background: "#faf8f4",
        borderRadius: 6,
        height: 580,
        boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
      className="book-container">
        {/* Paper texture */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: PAPER_TEXTURE, backgroundSize: "300px", backgroundRepeat: "repeat",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Spine shadow (center) */}
        <div aria-hidden style={{
          position: "absolute", left: "50%", top: 0, bottom: 0, width: 30,
          transform: "translateX(-50%)", zIndex: 15, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 30%, transparent 50%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.06) 100%)",
        }} />
        {/* Spine line */}
        <div aria-hidden style={{
          position: "absolute", left: "50%", top: 0, bottom: 0, width: 1,
          transform: "translateX(-0.5px)", zIndex: 16, pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.08) 90%, transparent)",
        }} />

        {/* Inner page curvature near spine */}
        <div aria-hidden style={{
          position: "absolute", left: "calc(50% - 40px)", top: 0, bottom: 0, width: 40,
          zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.015))",
        }} />
        <div aria-hidden style={{
          position: "absolute", left: "calc(50% + 1px)", top: 0, bottom: 0, width: 40,
          zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to left, transparent, rgba(0,0,0,0.015))",
        }} />

        {/* Page edge thickness (right side) */}
        <div aria-hidden style={{
          position: "absolute", right: 0, top: 8, bottom: 8, width: 5, zIndex: 3,
          background: "linear-gradient(to left, #e8e4dd, #f0ece6)",
          borderRadius: "0 3px 3px 0", pointerEvents: "none",
        }} />

        {/* ─── Half-Page Flip System ─── */}
        <div style={{ position: "relative", zIndex: 4 }}>

          {/* Base spread (visible underneath during flips) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 580 }}>
            <div style={{ borderRight: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", height: 580 }}>
              <LeftPageContent spread={spreads[baseLeftIndex]} spreads={spreads} onNavigate={goToSpread} bookContents={bookContents} />
            </div>
            <div style={{ overflow: "hidden", height: 580 }}>
              <RightPageContent spread={spreads[baseRightIndex]} spreads={spreads} bookPreface={bookPreface} />
            </div>
          </div>

          {/* Forward flip: RIGHT page flips left around the spine */}
          <AnimatePresence>
            {flipState === "flipping-forward" && (
              <motion.div
                key={`flip-fwd-${spread}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                exit={{ rotateY: -180 }}
                onAnimationComplete={() => onFlipComplete()}
                transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
                style={{
                  position: "absolute", top: 0, bottom: 0,
                  left: "50%", width: "50%",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  zIndex: 10,
                  perspective: 2500,
                }}
              >
                {/* Front: current right page content */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "#faf8f4",
                  backfaceVisibility: "hidden",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: PAPER_TEXTURE, backgroundSize: "300px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
                  <RightPageContent spread={spreads[spread]} spreads={spreads} bookPreface={bookPreface} />
                  {/* Shadow intensifies during flip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(to left, rgba(0,0,0,0.25) 0%, transparent 50%)",
                    }}
                  />
                </div>

                {/* Back: next spread's left page content */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "#faf8f4",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: PAPER_TEXTURE, backgroundSize: "300px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
                  <LeftPageContent spread={spreads[nextSpread]} spreads={spreads} onNavigate={goToSpread} bookContents={bookContents} />
                  {/* Shadow on back side near spine */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "linear-gradient(to right, rgba(0,0,0,0.06) 0%, transparent 25%)",
                  }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Backward flip: LEFT page flips right around the spine */}
          <AnimatePresence>
            {flipState === "flipping-backward" && (
              <motion.div
                key={`flip-bwd-${spread}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                exit={{ rotateY: 180 }}
                onAnimationComplete={() => onFlipComplete()}
                transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
                style={{
                  position: "absolute", top: 0, bottom: 0,
                  left: 0, width: "50%",
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  zIndex: 10,
                  perspective: 2500,
                }}
              >
                {/* Front: current left page content */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "#faf8f4",
                  backfaceVisibility: "hidden",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: PAPER_TEXTURE, backgroundSize: "300px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
                  <LeftPageContent spread={spreads[spread]} spreads={spreads} onNavigate={goToSpread} bookContents={bookContents} />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 50%)",
                    }}
                  />
                </div>

                {/* Back: previous spread's right page content */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "#faf8f4",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(-180deg)",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: PAPER_TEXTURE, backgroundSize: "300px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
                  <RightPageContent spread={spreads[nextSpread]} spreads={spreads} bookPreface={bookPreface} />
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "linear-gradient(to left, rgba(0,0,0,0.06) 0%, transparent 25%)",
                  }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Corner hover hotspots */}
        <div
          onMouseEnter={() => canFlip && setCornerHover("right")}
          onMouseLeave={() => setCornerHover("none")}
          onClick={goForward}
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "25%",
            zIndex: 20, cursor: canFlip ? "pointer" : "default",
          }}
        >
          <AnimatePresence>
            {cornerHover === "right" && canFlip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 60, height: 60,
                  background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.08) 100%)",
                  borderRadius: "4px 0 0 0",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <div
          onMouseEnter={() => canFlip && spread > 0 && setCornerHover("left")}
          onMouseLeave={() => setCornerHover("none")}
          onClick={goBackward}
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "25%",
            zIndex: 20, cursor: spread > 0 && canFlip ? "pointer" : "default",
          }}
        >
          <AnimatePresence>
            {cornerHover === "left" && spread > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: 60, height: 60,
                  background: "linear-gradient(-135deg, transparent 50%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.08) 100%)",
                  borderRadius: "0 4px 0 0",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Ambient shadow under book */}
      <div aria-hidden style={{
        width: "85%", height: 20, margin: "0 auto",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.2), transparent 70%)",
        marginTop: -4,
      }} />

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: -18, right: -18,
          width: 40, height: 40, borderRadius: "50%",
          background: "var(--color-ink)", color: "var(--color-paper)",
          border: "2px solid rgba(255,255,255,0.1)",
          cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 30, transition: "background 0.2s, transform 0.2s",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-ink)"; e.currentTarget.style.transform = "scale(1)"; }}
        aria-label="Close book"
      >
        ×
      </button>

      {/* Navigation buttons */}
      <button
        onClick={goBackward}
        disabled={false}
        style={{
          position: "absolute", left: -60, top: "50%", transform: "translateY(-50%)",
          width: 48, height: 80, borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
          cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
          zIndex: 30, transition: "all 0.25s ease",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          opacity: 1,
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
        aria-label="Previous page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Prev</span>
      </button>

      <button
        onClick={goForward}
        disabled={false}
        style={{
          position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)",
          width: 48, height: 80, borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
          cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
          zIndex: 30, transition: "all 0.25s ease",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          opacity: 1,
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
        aria-label={spread >= totalSpreads ? "Close book" : "Next page"}
      >
        {spread >= totalSpreads ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Close</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Next</span>
          </>
        )}
      </button>

      {/* Page counter + bookmark */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem",
        marginTop: "1.5rem",
      }}>
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {Array.from({ length: totalSpreads + 1 }, (_, i) => (
            <div
              key={i}
              style={{
                width: i === spread ? 20 : 6, height: 6,
                borderRadius: 3,
                background: i === spread ? "var(--color-accent)" : "rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem",
          letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
        }}>
          {spread === 0 ? "Contents" : `${spread} / ${totalSpreads}`}
        </span>
      </div>
    </div>
  );
}

// ─── Book Overlay (reusable for each book) ───────────────────────────────────
function BookOverlay({
  studies,
  coverTitle,
  overlayState,
  onClose,
  bookPreface,
  bookContents,
}: {
  studies: CaseStudy[];
  coverTitle: string;
  overlayState: "hidden" | "overlay-flip" | "overlay-open";
  onClose: () => void;
  bookPreface?: import("@/lib/notion").CaseStudyPreface;
  bookContents?: import("@/lib/notion").CaseStudyContent[];
}) {
  return (
    <AnimatePresence>
      {overlayState !== "hidden" && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "radial-gradient(ellipse at 50% 30%, #1e1a16 0%, #0d0b09 50%, #060504 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "2rem", overflow: "auto",
          }}
        >
          <DivineParticles />

          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1040 }}>
            {/* Phase 1: Cover splits open */}
            {overlayState === "overlay-flip" && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ perspective: "2000px", perspectiveOrigin: "50% 50%" }}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ width: 600, height: 500, position: "relative", transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      style={{
                        position: "absolute", inset: 0, background: "#faf8f4",
                        borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: "100%", background: "linear-gradient(to bottom, transparent, rgba(200,195,185,0.5) 10%, rgba(200,195,185,0.5) 90%, transparent)" }} />
                      <motion.p
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic", color: "var(--color-slate)" }}
                      >
                        Opening…
                      </motion.p>
                    </motion.div>

                    {/* LEFT half */}
                    <motion.div
                      initial={{ rotateY: 0 }} animate={{ rotateY: 180 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%", transformOrigin: "right center", transformStyle: "preserve-3d", zIndex: 2 }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "var(--color-ink)", borderRadius: "4px 0 0 4px", boxShadow: "-4px 4px 16px rgba(0,0,0,0.3)", backfaceVisibility: "hidden", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_SVG, backgroundSize: "200px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: 0, left: 0, width: 600, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ textAlign: "center", color: "var(--color-paper)" }}>
                            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>{coverTitle}</h2>
                            <div style={{ width: 40, height: 2, background: "var(--color-accent)", margin: "0 auto" }} />
                          </div>
                        </div>
                      </div>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1614, #2a2420)", borderRadius: "0 4px 4px 0", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} />
                    </motion.div>

                    {/* RIGHT half */}
                    <motion.div
                      initial={{ rotateY: 0 }} animate={{ rotateY: -180 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "50%", transformOrigin: "left center", transformStyle: "preserve-3d", zIndex: 2 }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "var(--color-ink)", borderRadius: "0 4px 4px 0", boxShadow: "4px 4px 16px rgba(0,0,0,0.3)", backfaceVisibility: "hidden", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_SVG, backgroundSize: "200px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ textAlign: "center", color: "var(--color-paper)" }}>
                            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>{coverTitle}</h2>
                            <div style={{ width: 40, height: 2, background: "var(--color-accent)", margin: "0 auto" }} />
                          </div>
                        </div>
                      </div>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(-135deg, #1a1614, #2a2420)", borderRadius: "4px 0 0 4px", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Phase 2: Open book */}
            {overlayState === "overlay-open" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <OpenBook studies={studies} onClose={onClose} bookPreface={bookPreface} bookContents={bookContents} />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CaseStudies({
  productCaseStudies,
  managementCaseStudies,
  books,
  showDeepDives = true,
  sectionNumber = 4,
}: {
  productCaseStudies: CaseStudy[];
  managementCaseStudies: CaseStudy[];
  books?: CaseStudy[];
  showDeepDives?: boolean;
  sectionNumber?: number;
}) {
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const [overlayState, setOverlayState] = useState<"hidden" | "overlay-flip" | "overlay-open">("hidden");

  const bookList: CaseStudy[] = books && books.length > 0
    ? books
    : [
        { id: "product", title: "Product\nCase Studies", label: "", type: "Product", contents: [] },
        { id: "management", title: "Management\nCase Studies", label: "", type: "Management", contents: [] },
      ];

  const handleOpenBook = (index: number) => {
    setActiveBook(index);
    setOverlayState("overlay-flip");
    setTimeout(() => {
      setOverlayState("overlay-open");
    }, 1200);
  };

  const handleCloseBook = () => {
    setOverlayState("hidden");
    setActiveBook(null);
  };

  const activeBookEntry = activeBook !== null ? bookList[activeBook] : null;
  const activeStudies = activeBookEntry?.type === "Product" ? productCaseStudies : managementCaseStudies;
  const activeCoverTitle = activeBookEntry?.title ?? "";

  if (!showDeepDives) return null;

  return (
    <section
      id="casestudies"
      className="casestudies-section"
      style={{
        background: "var(--color-cream)",
        padding: "var(--space-2xl, 10rem) var(--space-lg, 4rem)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", marginBottom: "var(--space-xl, 6rem)" }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 800,
          lineHeight: 1, opacity: 0.08, display: "block", marginBottom: "-2rem", userSelect: "none",
        }}>
            {String(sectionNumber).padStart(2, "0")}
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700, color: "var(--color-ink)", lineHeight: 1.1,
          letterSpacing: "-0.02em", position: "relative",
        }}>
          Deep Dives.{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>In Depth.</em>
        </h2>
      </div>

      {/* Books */}
      <div style={{
        flex: 1, display: "flex",
        alignItems: "center", justifyContent: "center",
        gap: "6rem", flexWrap: "wrap",
        width: "100%", maxWidth: 1040, margin: "0 auto",
        padding: "4rem 0",
      }}>
        {bookList.map((book, i) => {
          const count = book.type === "Product" ? productCaseStudies.length : managementCaseStudies.length;
          return (
            <BookCover
              key={i}
              title={book.title}
              label={book.label || undefined}
              coverImage={book.coverImage}
              subtitle={`${count} studies`}
              onClick={() => handleOpenBook(i)}
            />
          );
        })}
      </div>

      {/* Shared overlay */}
      <BookOverlay
        studies={activeStudies}
        coverTitle={activeCoverTitle}
        overlayState={overlayState}
        onClose={handleCloseBook}
        bookPreface={activeBookEntry?.preface}
        bookContents={activeBookEntry?.contents}
      />
    </section>
  );
}
