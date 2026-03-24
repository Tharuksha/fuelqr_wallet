import { ImageResponse } from "next/og";

const bg = "#09090b";
const accent = "#f97316";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const inner = 104;
  const radius = 28;
  const fontSize = 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: inner,
            height: inner,
            borderRadius: radius,
            background: accent,
            fontSize,
            fontWeight: 800,
            color: bg,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size },
  );
}
