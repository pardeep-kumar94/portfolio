import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Pardeep Kumar — Senior Mobile Application Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const photoData = await readFile(join(process.cwd(), "public/pic.png"), "base64");
  const photoSrc = `data:image/png;base64,${photoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          padding: "64px",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* Photo */}
        <img
          src={photoSrc}
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #333",
            flexShrink: 0,
          }}
        />

        {/* Right — text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            height: "100%",
          }}
        >
          {/* Top — name + title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "20px" }}>
            <div
              style={{
                fontSize: "18px",
                color: "#888",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              pardeep.me
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              Pardeep Kumar
            </div>
            <div
              style={{
                fontSize: "28px",
                color: "#a0a0a0",
              }}
            >
              Senior Mobile Application Developer
            </div>
          </div>

          {/* Bottom — stats */}
          <div
            style={{
              display: "flex",
              gap: "36px",
              borderTop: "1px solid #222",
              paddingTop: "32px",
            }}
          >
            {[
              { num: "9+", label: "Years Exp." },
              { num: "1M+", label: "Users Served" },
              { num: "99.4%", label: "Crash-free" },
              { num: "RN · Kotlin", label: "Core Stack" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  {stat.num}
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
