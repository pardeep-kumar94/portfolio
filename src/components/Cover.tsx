"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroField, HeroStat } from "@/lib/notion";

const NOISE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E`;

const slideUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

interface CoverProps {
  hero: HeroField[];
  heroStats: HeroStat[];
}

function getHeroValue(hero: HeroField[], key: string, fallback: string): string {
  return hero.find((h) => h.key === key)?.value || fallback;
}

export default function Cover({ hero, heroStats }: CoverProps) {
  const name = getHeroValue(hero, "name", "Pardeep Kumar");
  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");
  const profileTitle = getHeroValue(hero, "title", "Senior React Native Developer");
  const tagline = getHeroValue(hero, "tagline", "9+ Years  ·  Dubai, UAE  ·  1M+ Users Served");
  return (
    <section
      id="cover"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-paper)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      {/* Inner grid */}
      <div
        className="cover-inner relative z-20 w-full"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "var(--space-lg, 4rem)",
          display: "grid",
          gridTemplateRows: "auto 1fr auto auto",
          minHeight: "100vh",
        }}
      >

      {/* Main content */}
      <div
        className="cover-main"
        style={{
          alignSelf: "center",
          padding: "var(--space-xl, 6rem) 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-xl, 6rem)",
        }}
      >

        {/* LEFT: Text */}
        <div className="flex-1 flex flex-col items-start">
          {/* Name */}
          <motion.h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
            }}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <span style={{ display: "block", color: "var(--color-paper)" }}>{firstName}</span>
            <motion.span
              style={{ display: "block", color: "var(--color-accent)", fontStyle: "italic" }}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              custom={0.38}
            >
              {lastName}
            </motion.span>
          </motion.h1>

          {/* Red accent rule */}
          <motion.div
            className="mt-5 mb-5"
            style={{ backgroundColor: "var(--color-accent)", width: "80px", height: "3px" }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.6}
          />

          {/* Subtitle */}
          <motion.p
            className="italic mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-paper)",
              opacity: 0.9,
              fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
            }}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
          >
            {profileTitle}
          </motion.p>

          {/* Meta */}
          <motion.p
            style={{
              fontFamily: "var(--font-mono)",
              color: "rgba(245,240,232,0.5)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
            }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.8}
          >
            {tagline}
          </motion.p>
        </div>

        {/* RIGHT: Photo */}
        <motion.div
          className="cover-photo flex-shrink-0"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <div
            className="group relative w-[280px] h-[280px] overflow-hidden cursor-default"
            style={{
              border: "3px solid rgba(245,240,232,0.15)",
              borderRadius: "50%",
              boxShadow: "0 0 80px rgba(196,75,43,0.15)",
              transition: "transform 0.4s ease, border-color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "scale(1.05)";
              el.style.borderColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "scale(1)";
              el.style.borderColor = "rgba(245,240,232,0.15)";
            }}
          >
            <Image
              src="/pic.png"
              alt="Pardeep Kumar"
              width={280}
              height={280}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(30%) contrast(1.05)" }}
              priority
            />
          </div>
        </motion.div>

      </div>

      {/* Bottom stats strip */}
      <motion.div
        className="cover-stats"
        style={{
          display: "flex",
          gap: "var(--space-lg, 4rem)",
          borderTop: "1px solid rgba(245,240,232,0.15)",
          paddingTop: "var(--space-md, 2rem)",
        }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.0}
      >
        <div className="cover-stats" style={{ display: "flex", gap: "var(--space-lg, 4rem)", flexWrap: "wrap" }}>
          {heroStats.map(({ value, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {value}
              </span>
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  opacity: 0.5,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-2 pt-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.2}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            opacity: 0.4,
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          className="w-px h-10"
          style={{ backgroundColor: "var(--color-accent)" }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      </div>{/* end inner grid */}
    </section>
  );
}
