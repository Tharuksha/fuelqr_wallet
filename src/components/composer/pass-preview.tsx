"use client";

import { motion } from "framer-motion";
import { QRFrame } from "@/components/composer/qr-frame";
import { useDisableMotionGestures } from "@/hooks/use-motion-gestures-safe";

interface PassPreviewProps {
  readonly passTitle: string;
  readonly vehicleNumber: string;
  readonly holderName: string;
  readonly qrDataUrl: string | null;
}

function FuelGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-zinc-400"
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

const PLACEHOLDER_CELLS = Array.from({ length: 25 }, (_, i) => ({
  id: `qr-ph-${i}`,
  filled: i % 3 === 0,
}));

function QRPlaceholder() {
  return (
    <div
      className="flex h-[148px] w-[148px] flex-col items-center justify-center gap-2 rounded-lg bg-zinc-900/90 ring-1 ring-zinc-800"
      aria-hidden
    >
      <div className="grid grid-cols-5 gap-1 opacity-35">
        {PLACEHOLDER_CELLS.map((cell) => (
          <span
            key={cell.id}
            className={`h-2 w-2 rounded-sm ${cell.filled ? "bg-zinc-400" : "bg-zinc-700"}`}
          />
        ))}
      </div>
      <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-600">
        QR
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
  const disableGestures = useDisableMotionGestures();

  return (
    <motion.div
      className="relative w-full"
      whileHover={disableGestures ? undefined : { scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      <div className="overflow-hidden rounded-xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 to-zinc-950">
        <div className="border-b border-zinc-800/80 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80">
              <FuelGlyph />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Pass
              </p>
              <p className="truncate font-head text-base font-semibold tracking-tight text-zinc-100">
                {passTitle.trim() || "Fuel Pass"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-5">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Vehicle
          </p>
          <p className="font-head mt-1 text-[1.5rem] font-semibold leading-none tracking-tight text-zinc-50 tabular-nums sm:text-3xl">
            {vehicleNumber.trim() || "— — — —"}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {holderName.trim() || "Name on pass"}
          </p>

          <div className="mt-6 flex justify-center">
            <QRFrame>
              <div className="flex items-center justify-center">
                {qrDataUrl ? (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="overflow-hidden rounded-lg bg-white p-1.5"
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
