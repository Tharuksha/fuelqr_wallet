"use client";

export function ParticleBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-[#09090b]"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 20%, black, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(255,255,255,0.06), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 100% 100%, rgba(63,63,70,0.35), transparent 55%)",
        }}
      />
    </div>
  );
}
