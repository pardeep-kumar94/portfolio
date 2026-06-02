"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import type { ContactLink } from "@/lib/notion";

export default function Contact({ contactLinks }: { contactLinks: ContactLink[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen"
      // Prevent browser autofill/password-manager UI from highlighting contact cards
      data-form-type="other"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-paper)",
      }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem]"
        style={{
          background: "radial-gradient(circle, rgba(196, 75, 43, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 py-16 text-center sm:px-10 lg:px-16">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="leading-none tracking-tight"
          style={{
            margin: 0,
            marginBottom: "2rem",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--color-paper)",
          }}
        >
          Let&rsquo;s Build Something Great
        </motion.h2>

        {/* Accent rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="origin-center"
          style={{
            display: "block",
            margin: "1.5rem auto 3rem",
            height: "3px",
            width: "60px",
            backgroundColor: "var(--color-accent)",
          }}
        />

        {/* Contact grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            display: "grid",
            maxWidth: "700px",
            width: "100%",
            gap: "1rem",
            margin: "0 auto 2.5rem",
          }}
        >
          {contactLinks.map((link) => (
            <ContactLink key={link.key} label={link.label} value={link.value} href={link.href} />
          ))}
        </motion.div>

        {/* Download CV */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          style={{ marginBottom: "4rem" }}
        >
          <a
            href="/cv.pdf"
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 3rem",
              border: "1px solid var(--color-accent)",
              borderRadius: "2px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--color-accent)",
              backgroundColor: "transparent",
              textDecoration: "none",
              transition: "background-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "var(--color-accent)";
              el.style.color = "var(--color-paper)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.color = "var(--color-accent)";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </motion.div>

        {/* Colophon */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="m-0 text-[0.7rem] uppercase tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-paper)",
            opacity: 0.3,
          }}
        >
          Dubai, UAE &middot; Available for senior mobile engineering roles
        </motion.p>
      </div>
    </section>
  );
}

function ContactLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <div
      className="transition-colors duration-200"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1.5rem",
        borderRadius: "2px",
        border: "1px solid rgba(245,240,232,0.25)",
        backgroundColor: "rgba(255,255,255,0.05)",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-accent)";
        el.style.backgroundColor = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(245,240,232,0.25)";
        el.style.backgroundColor = "rgba(255,255,255,0.05)";
      }}

    >
      <span
        className="text-[0.65rem] uppercase tracking-[0.25em]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        {label}
      </span>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="break-all text-base font-medium no-underline hover:underline"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-paper)",
        }}
      >
        {value}
      </a>
    </div>
  );
}
