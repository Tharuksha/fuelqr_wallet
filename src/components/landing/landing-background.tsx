"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

function Orb({
  allowMotion,
  className,
  duration,
  delay = 0,
  path,
}: Readonly<{
  allowMotion: boolean;
  className: string;
  duration: number;
  delay?: number;
  path: { x: number[]; y: number[] };
}>) {
  return (
    <motion.div
      className={className}
      aria-hidden
      animate={
        allowMotion ? { x: path.x, y: path.y } : { x: 0, y: 0 }
      }
      transition={
        allowMotion
          ? {
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration: 0 }
      }
    />
  );
}

export function LandingBackground() {
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion() === true;
  const allowAmbientMotion = hydrated && !prefersReducedMotion;
  const rawId = useId().replaceAll(":", "");
  const patternId = `landing-qr-${rawId}`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-[#09090b]"
      aria-hidden
    >
      <div
        className="landing-ambient-pulse absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% -15%, rgba(250,250,250,0.07), transparent 55%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 18%, black, transparent 78%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            linear-gradient(115deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 40%, black 20%, transparent 72%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 100% 85%, rgba(82,82,91,0.28), transparent 58%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 70%, rgba(63,63,70,0.2), transparent 60%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full text-zinc-500 opacity-[0.045]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={patternId}
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="6"
              y="6"
              width="10"
              height="10"
              rx="2"
              fill="currentColor"
              opacity="0.9"
            />
            <rect
              x="22"
              y="10"
              width="6"
              height="6"
              rx="1"
              fill="currentColor"
              opacity="0.55"
            />
            <rect
              x="34"
              y="22"
              width="14"
              height="14"
              rx="2"
              fill="currentColor"
              opacity="0.35"
            />
            <rect
              x="10"
              y="28"
              width="8"
              height="8"
              rx="1.5"
              fill="currentColor"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <Orb
        allowMotion={allowAmbientMotion}
        className="absolute -left-[10%] top-[8%] h-[min(52vw,520px)] w-[min(52vw,520px)] rounded-full bg-zinc-500/15 blur-[100px] sm:blur-[120px]"
        duration={34}
        delay={0}
        path={{ x: [0, 36, -14, 0], y: [0, -28, 16, 0] }}
      />
      <Orb
        allowMotion={allowAmbientMotion}
        className="absolute -right-[8%] bottom-[12%] h-[min(48vw,480px)] w-[min(48vw,480px)] rounded-full bg-zinc-600/12 blur-[95px] sm:blur-[115px]"
        duration={28}
        delay={-6}
        path={{ x: [0, -32, 22, 0], y: [0, 24, -18, 0] }}
      />
      <div className="absolute left-[55%] top-[42%] -translate-x-1/2">
        <Orb
          allowMotion={allowAmbientMotion}
          className="h-[min(38vw,380px)] w-[min(38vw,380px)] rounded-full bg-zinc-100/[0.06] blur-[90px] sm:blur-[110px]"
          duration={40}
          delay={-12}
          path={{ x: [0, -24, 18, 0], y: [0, 20, -32, 0] }}
        />
      </div>
    </div>
  );
}
