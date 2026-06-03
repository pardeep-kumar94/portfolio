import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pardeep Kumar — Senior Mobile App Developer | React Native & Android",
  description:
    "Pardeep Kumar is a Senior Mobile Application Developer with 9+ years of experience building production-grade iOS & Android apps for 1M+ users. Expert in React Native, Android (Kotlin), TypeScript, and cross-platform mobile development.",
  keywords: [
    "mobile app developer",
    "mobile application developer",
    "Android developer",
    "React Native developer",
    "iOS developer",
    "cross-platform developer",
    "software developer",
    "software engineer",
    "Kotlin developer",
    "TypeScript developer",
    "senior mobile developer",
    "senior software engineer",
    "React Native engineer",
    "Android application developer",
    "mobile software engineer",
    "Pardeep Kumar",
    "mobile developer Dubai",
    "React Native Dubai",
    "Android developer UAE",
    "mobile app development",
  ],
  authors: [{ name: "Pardeep Kumar" }],
  openGraph: {
    title: "Pardeep Kumar — Senior Mobile App Developer | React Native & Android",
    description:
      "Senior Mobile Application Developer with 9+ years building iOS & Android apps for 1M+ users. Specializing in React Native, Kotlin, performance engineering, and cross-platform development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pardeep Kumar — Senior Mobile App Developer",
    description:
      "Senior Mobile Application Developer with 9+ years building iOS & Android apps for 1M+ users. React Native, Kotlin, TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pardeep Kumar",
              jobTitle: "Senior Mobile Application Developer",
              description:
                "Senior Mobile Application Developer with 9+ years of experience building production-grade iOS and Android apps using React Native, Kotlin, and TypeScript.",
              url: "https://pardeep.me",
              sameAs: [
                "https://www.linkedin.com/in/pardeep-kumar480/",
                "https://github.com/pardeep-kumar94",
              ],
              knowsAbout: [
                "Mobile App Development",
                "Android Development",
                "React Native",
                "iOS Development",
                "Kotlin",
                "TypeScript",
                "Cross-Platform Development",
                "Software Engineering",
                "Performance Optimization",
                "WebRTC",
              ],
              worksFor: {
                "@type": "Organization",
                name: "KPTAC Technologies",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE",
              },
            }),
          }}
        />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
