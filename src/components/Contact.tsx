"use client";

import { useRef, useActionState, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { ContactLink } from "@/lib/notion";
import { sendContactEmail, type ContactFormState } from "@/app/actions/contact";

// ─── Icons ────────────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const KEY_ICONS: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
  phone: <PhoneIcon />,
  email: <EmailIcon />,
};

function getIcon(key: string) {
  return KEY_ICONS[key.toLowerCase()] ?? <LinkIcon />;
}

// ─── Contact Item ─────────────────────────────────────────────────────────────

function ContactItem({ link, delay, inView }: { link: ContactLink; delay: number; inView: boolean }) {
  const isExternal = link.href.startsWith("http");
  return (
    <motion.a
      href={link.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1.75rem 2rem",
        border: "1px solid rgba(245,240,232,0.12)",
        borderRadius: "2px",
        color: "var(--color-paper)",
        textDecoration: "none",
        backgroundColor: "rgba(255,255,255,0.04)",
        transition: "border-color 0.22s ease, background-color 0.22s ease, color 0.22s ease",
        flex: "1 1 0",
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-accent)";
        el.style.backgroundColor = "rgba(196,75,43,0.08)";
        el.style.color = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(245,240,232,0.12)";
        el.style.backgroundColor = "rgba(255,255,255,0.04)";
        el.style.color = "var(--color-paper)";
      }}
    >
      <span>{getIcon(link.key)}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.5 }}>
        {link.label}
      </span>
    </motion.a>
  );
}

// ─── CV Download ──────────────────────────────────────────────────────────────

function CvItem({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <motion.a
      href="/cv.pdf"
      download
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1.75rem 2rem",
        border: "1px solid rgba(196,75,43,0.4)",
        borderRadius: "2px",
        color: "var(--color-accent)",
        textDecoration: "none",
        backgroundColor: "rgba(196,75,43,0.06)",
        transition: "border-color 0.22s ease, background-color 0.22s ease",
        flex: "1 1 0",
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-accent)";
        el.style.backgroundColor = "rgba(196,75,43,0.14)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(196,75,43,0.4)";
        el.style.backgroundColor = "rgba(196,75,43,0.06)";
      }}
    >
      <span><DownloadIcon /></span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7 }}>
        Download CV
      </span>
    </motion.a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

// ─── Success Popup ────────────────────────────────────────────────────────────

function SuccessPopup({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--color-paper)",
            borderRadius: "4px",
            padding: "3rem 3.5rem",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem",
            maxWidth: 360, width: "90%", textAlign: "center",
          }}
        >
          {/* Green circle check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#22c55e",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--color-ink)", margin: 0 }}>
            Message Sent!
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--color-slate)", margin: 0, lineHeight: 1.6 }}>
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <button
            onClick={onClose}
            style={{
              marginTop: "0.5rem",
              padding: "0.7rem 2rem",
              border: "1px solid var(--color-accent)",
              borderRadius: "2px",
              background: "transparent",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-paper)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-accent)"; }}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm({ inView }: { inView: boolean }) {
  const [state, action, pending] = useActionState<ContactFormState, FormData>(
    sendContactEmail,
    { status: "idle" }
  );
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Show popup when submission succeeds
  if (state.status === "success" && !showPopup) {
    setShowPopup(true);
    formRef.current?.reset();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(245,240,232,0.15)",
    borderRadius: "2px",
    padding: "0.875rem 1rem",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    color: "var(--color-paper)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}

    <motion.form
      ref={formRef}
      action={action}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}
    >
      {/* Name + Email row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="contact-form-row">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)")}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)")}
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Your message"
        rows={4}
        required
        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)")}
      />

      {/* Footer: status + button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.05em" }}>
          {state.status === "error" && (
            <span style={{ color: "#f87171" }}>{state.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.875rem 2.5rem",
            border: "1px solid var(--color-accent)",
            borderRadius: "2px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: pending ? "rgba(196,75,43,0.5)" : "var(--color-accent)",
            backgroundColor: "transparent",
            cursor: pending ? "default" : "pointer",
            transition: "background-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (pending) return;
            const el = e.currentTarget;
            el.style.backgroundColor = "var(--color-accent)";
            el.style.color = "var(--color-paper)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "transparent";
            el.style.color = pending ? "rgba(196,75,43,0.5)" : "var(--color-accent)";
          }}
        >
          {pending ? "Sending…" : "Send Message"}
          {!pending && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </motion.form>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact({ contactLinks }: { contactLinks: ContactLink[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "var(--color-ink)", color: "var(--color-paper)" }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem]"
        style={{ background: "radial-gradient(circle, rgba(196, 75, 43, 0.15) 0%, transparent 70%)" }}
      />

      <div className="contact-inner relative z-10 mx-auto w-full max-w-[900px] px-6 py-16 text-center sm:px-10 lg:px-16">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            margin: 0,
            marginBottom: "2rem",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--color-paper)",
            lineHeight: 1,
          }}
        >
          Let&rsquo;s Build Something Great
        </motion.h2>

        {/* Accent rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          style={{ display: "block", margin: "1.5rem auto 3rem", height: "3px", width: "60px", backgroundColor: "var(--color-accent)" }}
        />

        {/* Form */}
        <ContactForm inView={inView} />

        {/* Row */}
        <motion.div
          className="contact-row"
          style={{ display: "flex", gap: "1rem", alignItems: "stretch", width: "100%" }}
        >
          {contactLinks.map((link, i) => (
            <ContactItem key={link.key} link={link} delay={0.35 + i * 0.08} inView={inView} />
          ))}
          <CvItem delay={0.35 + contactLinks.length * 0.08} inView={inView} />
        </motion.div>
      </div>
    </section>
  );
}
