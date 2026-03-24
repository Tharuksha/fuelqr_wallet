"use client";

import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useDisableMotionGestures } from "@/hooks/use-motion-gestures-safe";

function UploadIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function GlassPanel({
  children,
  className = "",
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset] backdrop-blur-xl sm:p-7 ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function getDropzoneStateClass(
  uploadError: string | null,
  qrDataUrl: string | null,
  dragOver: boolean
): string {
  if (uploadError && !qrDataUrl) {
    return "border-red-500/35 bg-red-950/15 hover:border-red-500/45";
  }
  if (dragOver) {
    return "border-zinc-500/50 bg-zinc-900/50";
  }
  return "border-zinc-700/90 bg-zinc-950/40 hover:border-zinc-600 hover:bg-zinc-900/35";
}

interface SourceIngestPanelProps {
  readonly inputRef: RefObject<HTMLInputElement | null>;
  readonly setDragOver: (v: boolean) => void;
  readonly onDrop: (e: React.DragEvent) => void;
  readonly loadFile: (file: File | undefined) => void | Promise<void>;
  readonly isValidating: boolean;
  readonly qrDataUrl: string | null;
  readonly uploadError: string | null;
  readonly dropzoneStateClass: string;
  /** Set when this panel sits inside a parent card so it does not add another frame. */
  readonly embedded?: boolean;
}

export function SourceIngestPanel({
  inputRef,
  setDragOver,
  onDrop,
  loadFile,
  isValidating,
  qrDataUrl,
  uploadError,
  dropzoneStateClass,
  embedded = false,
}: SourceIngestPanelProps) {
  const disableGestures = useDisableMotionGestures();

  const inner = (
    <>
      <div className="mb-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          QR code
        </p>
        <h3 className="font-head mt-1.5 text-lg font-semibold text-zinc-100">
          Upload
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Image must contain a readable QR. Checked in your browser only.
        </p>
      </div>

      <motion.button
        type="button"
        disabled={isValidating}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isValidating) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        whileHover={
          disableGestures || isValidating ? undefined : { scale: 1.005 }
        }
        whileTap={
          disableGestures || isValidating ? undefined : { scale: 0.995 }
        }
        className={`group relative flex min-h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 disabled:cursor-wait disabled:opacity-90 ${dropzoneStateClass}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            void Promise.resolve(loadFile(e.target.files?.[0])).catch(
              () => undefined
            );
          }}
        />
        {isValidating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-950/90 backdrop-blur-md">
            <span
              className="h-9 w-9 animate-spin rounded-full border-2 border-zinc-800 border-t-zinc-300"
              aria-hidden
            />
            <p className="text-sm text-zinc-400">Reading QR…</p>
          </div>
        )}
        {qrDataUrl ? (
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- upload preview uses a data URL, not a remote src */}
            <img
              src={qrDataUrl}
              alt="Uploaded QR preview"
              className="mx-auto max-h-44 max-w-full rounded-xl object-contain ring-1 ring-zinc-800"
            />
            <p className="mt-4 text-center text-xs text-zinc-500">
              Click or drop to replace
            </p>
          </motion.div>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
            <div className="relative">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/80 transition-transform duration-300 group-hover:scale-[1.02]">
                <UploadIcon className="h-6 w-6 text-zinc-400" />
              </div>
            </div>
            <div>
              <p className="font-head text-[15px] font-semibold text-zinc-100">
                Drop image here
              </p>
              <p className="mt-1 text-xs text-zinc-500">PNG, JPG, or WebP</p>
            </div>
          </div>
        )}
      </motion.button>

      {uploadError && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/25 bg-red-950/20 px-4 py-3 text-sm text-red-200/90"
        >
          {uploadError}
        </p>
      )}
    </>
  );

  if (embedded) return inner;
  return <GlassPanel>{inner}</GlassPanel>;
}

const inputClass =
  "w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20";

interface IdentityFieldsPanelProps {
  readonly passTitle: string;
  readonly setPassTitle: (v: string) => void;
  readonly vehicleNumber: string;
  readonly setVehicleNumber: (v: string) => void;
  readonly holderName: string;
  readonly setHolderName: (v: string) => void;
  readonly embedded?: boolean;
}

export function IdentityFieldsPanel({
  passTitle,
  setPassTitle,
  vehicleNumber,
  setVehicleNumber,
  holderName,
  setHolderName,
  embedded = false,
}: IdentityFieldsPanelProps) {
  const inner = (
    <>
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Details
      </p>
      <h3 className="font-head mt-1.5 text-lg font-semibold text-zinc-100">
        Pass fields
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        Updates the preview as you type.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="block">
          <label
            htmlFor="pass-title"
            className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500"
          >
            <span>Title</span>
          </label>
          <input
            id="pass-title"
            className={inputClass}
            value={passTitle}
            onChange={(e) => setPassTitle(e.target.value)}
            placeholder="Fuel Pass"
            autoComplete="off"
          />
        </div>
        <div className="block">
          <label
            htmlFor="pass-vehicle"
            className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500"
          >
            <span>Vehicle number</span>
          </label>
          <input
            id="pass-vehicle"
            className={inputClass}
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="e.g. ABC 1234"
            autoComplete="off"
          />
        </div>
        <div className="block">
          <label
            htmlFor="pass-name"
            className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500"
          >
            <span>Name</span>
          </label>
          <input
            id="pass-name"
            className={inputClass}
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
          />
        </div>
      </div>
    </>
  );

  if (embedded) return inner;
  return <GlassPanel>{inner}</GlassPanel>;
}
