"use client";

import { motion, useReducedMotion } from "framer-motion";
import { QRFrame } from "@/components/qr-frame";

interface PassPreviewProps {
  passTitle: string;
  vehicleNumber: string;
  holderName: string;
  qrDataUrl: string | null;
}

function FuelGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 text-sky-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19V9a2 2 0 012-2h2.5a2 2 0 002-2V5h4v2a2 2 0 002 2H19a2 2 0 012 2v10M4 19h16M8 15h.01M12 15h.01M16 15h.01"
      />
    </svg>
  );
}

function QRPlaceholder() {
  return (
    <div
      className="flex h-[148px] w-[148px] flex-col items-center justify-center gap-2 rounded-xl bg-zinc-900/80 text-center"
      aria-hidden
    >
      <div className="grid grid-cols-5 gap-1 opacity-50">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-sm ${i % 3 === 0 ? "bg-white/80" : "bg-white/25"}`}
          />
        ))}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest text-white/35">
        QR preview
      </span>
    </div>
  );
}

export function PassPreview({
  passTitle,
  vehicleNumber,
  holderName,
  qrDataUrl,
}: PassPreviewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[340px]"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-violet-600/15 to-transparent blur-3xl"
      />
      <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-zinc-900 via-[#0f0f14] to-black p-[1px] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-1/2 top-0 h-1/2 w-[200%] bg-gradient-to-b from-white/[0.07] to-transparent"
        />
        <div className="relative rounded-[1.3rem] bg-gradient-to-b from-zinc-800/40 to-black/90 px-5 pb-6 pt-5 backdrop-blur-xl">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Digital pass
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
                {passTitle.trim() || "Fuel Pass"}
              </h3>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
              <FuelGlyph />
            </div>
          </div>

          <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/35">
            Vehicle
          </div>
          <p className="text-[1.65rem] font-bold leading-none tracking-tight text-white tabular-nums">
            {vehicleNumber.trim() || "— — — —"}
          </p>
          <p className="mt-3 text-sm text-white/55">
            {holderName.trim() || "Holder name"}
          </p>

          <div className="mt-6 flex justify-center">
            <QRFrame>
              <div className="flex items-center justify-center">
                {qrDataUrl ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="overflow-hidden rounded-xl bg-white p-1.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="QR code"
                      width={148}
                      height={148}
                      className="h-[148px] w-[148px] object-contain"
                    />
                  </motion.div>
                ) : (
                  <QRPlaceholder />
                )}
              </div>
            </QRFrame>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
