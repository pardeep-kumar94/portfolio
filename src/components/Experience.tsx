"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Role, Product } from "@/lib/notion";

const CHIP_COLORS = [
  { bg: "#fde8e0", text: "#c44b2b" }, // warm red
  { bg: "#dbeafe", text: "#1d4ed8" }, // blue
  { bg: "#dcfce7", text: "#15803d" }, // green
  { bg: "#ede9fe", text: "#6d28d9" }, // purple
  { bg: "#fef9c3", text: "#854d0e" }, // yellow
  { bg: "#ffedd5", text: "#c2410c" }, // orange
  { bg: "#fce7f3", text: "#9d174d" }, // pink
  { bg: "#f0fdf4", text: "#166534" }, // light green
];

// ─── Product Slide ────────────────────────────────────────────────────────────

function ProductSlide({ product }: { product: Product }) {
  return (
    <motion.div
      key={product.tag}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      style={{ width: "100%" }}
    >
      <div
        className="product-slide-inner"
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Text content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Product tag */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              border: "1px solid rgba(196,75,43,0.2)",
              padding: "0.3em 0.8em",
              alignSelf: "flex-start",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}
          >
            {product.tag}
          </p>

          {/* Product title */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--color-ink)",
              marginBottom: "0.875rem",
            }}
          >
            {product.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--color-charcoal)",
              marginBottom: "var(--space-md, 2rem)",
              maxWidth: 520,
            }}
          >
            {product.desc}
          </p>

          {/* Links */}
          {(product.links?.length ?? 0) > 0 && (
            <div style={{ marginBottom: "var(--space-md, 2rem)" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--color-charcoal)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Product Links
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {product.links!.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.05em",
                      color: "var(--color-accent)",
                      border: "1px solid rgba(196,75,43,0.25)",
                      borderRadius: 2,
                      padding: "0.35em 0.85em",
                      textDecoration: "none",
                      transition: "background 0.18s ease, border-color 0.18s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(196,75,43,0.08)";
                      e.currentTarget.style.borderColor = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(196,75,43,0.25)";
                    }}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {(product.features?.length ?? 0) > 0 && (
            <div style={{ marginBottom: "var(--space-md, 2rem)" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--color-charcoal)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Features
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {product.features.map((feature, i) => (
                  <span
                    key={feature}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.03em",
                      padding: "0.35em 0.85em",
                      borderRadius: "999px",
                      background: CHIP_COLORS[i % CHIP_COLORS.length].bg,
                      color: CHIP_COLORS[i % CHIP_COLORS.length].text,
                      fontWeight: 500,
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats row */}
          {product.stats.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                borderTop: `1px solid var(--color-whisper)`,
                borderBottom: `1px solid var(--color-whisper)`,
                padding: "var(--space-md, 2rem) 0",
                marginBottom: "var(--space-md, 2rem)",
              }}
            >
              {product.stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "1.8rem",
                      color: "var(--color-ink)",
                      lineHeight: 1,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {stat.num}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--color-charcoal)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {product.stack.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.03em",
                  color: "var(--color-charcoal)",
                  border: `1px solid var(--color-whisper)`,
                  borderRadius: 2,
                  padding: "0.4em 0.8em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
}

// ─── Role Block ───────────────────────────────────────────────────────────────

function RoleBlock({ role }: { role: Role; globalIndex: number }) {
  const [activeProduct, setActiveProduct] = useState(0);
  const productCount = role.products.length;

  const goPrev = () => setActiveProduct((p) => Math.max(0, p - 1));
  const goNext = () => setActiveProduct((p) => Math.min(productCount - 1, p + 1));

  return (
    <div style={{ marginBottom: "4rem" }}>
      <div
        className="role-card"
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          border: `1px solid var(--color-whisper)`,
          background: "var(--color-paper)",
          borderRadius: 8,
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          gap: "4rem",
          padding: "6rem",
          position: "relative",
        }}
      >
        {/* LEFT sidebar */}
        <div
          className="role-sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-lg, 4rem)",
          }}
        >
          {/* Index number */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "2.5rem",
              color: "var(--color-ink)",
              opacity: 0.15,
              lineHeight: 1,
            }}
          >
            {role.index}
          </p>

          {/* Meta */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-ink)",
              }}
            >
              {role.badge}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--color-slate)",
                lineHeight: 1.4,
              }}
            >
              {role.dates}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-slate)",
                opacity: 0.7,
              }}
            >
              {role.location}
            </span>
          </div>
        </div>

        {/* RIGHT body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Company name */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              marginBottom: "0.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {role.company}
          </h2>

          {/* Position */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-charcoal)",
              marginBottom: "2rem",
            }}
          >
            {role.position}
          </p>

          {/* Product slide area */}
          {productCount > 0 && (
            <div style={{ position: "relative", minHeight: 320 }}>
              <AnimatePresence mode="wait">
                <ProductSlide
                  key={activeProduct}
                  product={role.products[activeProduct]}
                />
              </AnimatePresence>
            </div>
          )}

          {/* Navigation bar: arrows + dots */}
          {productCount > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1.75rem",
              }}
            >
              {/* Prev arrow */}
              <button
                onClick={goPrev}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: `1px solid ${activeProduct > 0 ? "var(--color-whisper)" : "transparent"}`,
                  background: "transparent",
                  cursor: activeProduct > 0 ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  opacity: activeProduct > 0 ? 1 : 0.2,
                }}
                onMouseEnter={(e) => { if (activeProduct > 0) { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.background = "rgba(196,75,43,0.06)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = activeProduct > 0 ? "var(--color-whisper)" : "transparent"; e.currentTarget.style.background = "transparent"; }}
                aria-label="Previous product"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Dots */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {role.products.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveProduct(i)}
                    style={{
                      width: i === activeProduct ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === activeProduct ? "var(--color-accent)" : "var(--color-slate)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={goNext}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: `1px solid ${activeProduct < productCount - 1 ? "var(--color-whisper)" : "transparent"}`,
                  background: "transparent",
                  cursor: activeProduct < productCount - 1 ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  opacity: activeProduct < productCount - 1 ? 1 : 0.2,
                }}
                onMouseEnter={(e) => { if (activeProduct < productCount - 1) { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.background = "rgba(196,75,43,0.06)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = activeProduct < productCount - 1 ? "var(--color-whisper)" : "transparent"; e.currentTarget.style.background = "transparent"; }}
                aria-label="Next product"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Counter */}
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                letterSpacing: "0.1em", color: "var(--color-slate)",
                marginLeft: "0.5rem",
              }}>
                {activeProduct + 1} / {productCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

export default function Experience({ roles, sectionNumber = 2 }: { roles: Role[]; sectionNumber?: number }) {
  return (
    <section
      id="experience"
      className="experience-section"
      style={{
        background: "var(--color-paper)",
        padding: "10rem 4rem",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          marginBottom: "6rem",
        }}
      >
        {/* Section number */}
        <p
          className="section-number"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "6rem",
            fontWeight: 800,
            color: "var(--color-ink)",
            opacity: 0.08,
            lineHeight: 1,
            marginBottom: "-2rem",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
            {String(sectionNumber).padStart(2, "0")}
        </p>

        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
            lineHeight: 1.15,
            position: "relative",
          }}
        >
          Where I&apos;ve{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-charcoal)",
            }}
          >
            worked.
          </em>
        </h2>
      </div>

      {/* Role blocks */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {roles.map((role, i) => (
          <RoleBlock key={role.index} role={role} globalIndex={i} />
        ))}
      </div>
    </section>
  );
}
