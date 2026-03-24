import { ImageResponse } from "next/og";

const bg = "#09090b";
const accent = "#f97316";

export function generateImageMetadata() {
  return [
    {
      id: "192",
      size: { width: 192, height: 192 },
      contentType: "image/png",
      alt: "Fuel Pass",
    },
    {
      id: "512",
      size: { width: 512, height: 512 },
      contentType: "image/png",
      alt: "Fuel Pass",
    },
  ];
}

export default async function Icon({
  id,
}: {
  id: Promise<string | number>;
}) {
  const iconId = String(await id);
  const size = iconId === "192" ? 192 : 512;
  const inner = Math.round(size * 0.58);
  const radius = Math.round(size * 0.16);
  const fontSize = Math.round(size * 0.42);

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
    { width: size, height: size },
  );
}
