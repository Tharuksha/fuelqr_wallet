"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import {
  getDropzoneStateClass,
  IdentityFieldsPanel,
  SourceIngestPanel,
} from "@/components/composer/composer-panels";
import { LiveFrame } from "@/components/composer/live-frame";
import { PassPreview } from "@/components/composer/pass-preview";
import { useDisableMotionGestures } from "@/hooks/use-motion-gestures-safe";
import { validateQrImageFile } from "@/lib/validate-qr-image";

function WalletIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 6a2 2 0 012-2h10a2 2 0 012 2v2H4V6zm0 4h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10zm12 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );
}

export function GeneratorCard() {
  const disableGestures = useDisableMotionGestures();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrPayload, setQrPayload] = useState<string | null>(null);
  const [passTitle, setPassTitle] = useState("Fuel Pass");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [walletMessage, setWalletMessage] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const validatingRef = useRef(false);

  const resetFileInput = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const loadFile = useCallback(
    async (file: File | undefined) => {
      if (!file || validatingRef.current) return;

      validatingRef.current = true;
      setUploadError(null);
      setIsValidating(true);

      try {
        const result = await validateQrImageFile(file);

        if (result.ok) {
          setQrDataUrl(result.dataUrl);
          setQrPayload(result.qrPayload);
          setUploadError(null);
          return;
        }

        setUploadError(result.reason);
        resetFileInput();
      } finally {
        validatingRef.current = false;
        setIsValidating(false);
      }
    },
    [resetFileInput]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      void loadFile(e.dataTransfer.files[0]);
    },
    [loadFile]
  );

  const onWalletClick = async () => {
    setWalletError(null);
    setWalletMessage(null);

    if (!qrPayload?.length) {
      setWalletError("Upload a QR image first so the pass can include a barcode.");
      return;
    }

    setWalletLoading(true);
    try {
      const res = await fetch("/api/wallet-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passTitle,
          vehicleNumber,
          holderName,
          qrPayload,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "FuelPass.pkpass";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setWalletMessage(
          "Pass downloaded. On iPhone, open the file—Wallet should offer to add it."
        );
        return;
      }

      let detail = `Something went wrong (${res.status}).`;
      try {
        const data = (await res.json()) as { code?: string; message?: string };
        if (data.code === "SIGNING_NOT_CONFIGURED") {
          detail =
            "Wallet signing is not configured on this server. Add Apple Pass Type ID certificates and the PASS_* / APPLE_* environment variables to enable real .pkpass downloads.";
        } else if (data.message) {
          detail = data.message;
        }
      } catch {
        /* use default */
      }
      setWalletError(detail);
    } catch {
      setWalletError("Network error. Check your connection and try again.");
    } finally {
      setWalletLoading(false);
    }
  };

  const dropzoneStateClass = getDropzoneStateClass(
    uploadError,
    qrDataUrl,
    dragOver
  );

  return (
    <motion.section
      id="composer"
      aria-labelledby="composer-heading"
      className="relative z-10"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06 }}
    >
      <h2
        id="composer-heading"
        className="sr-only"
      >
        Compose pass
      </h2>

      <div className="rounded-3xl border border-zinc-800/90 bg-zinc-950/50 p-1 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.03] backdrop-blur-md">
        <div className="grid divide-y divide-zinc-800/80 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="flex flex-col divide-y divide-zinc-800/60">
            <div className="p-6 sm:p-8">
              <SourceIngestPanel
                embedded
                inputRef={inputRef}
                setDragOver={setDragOver}
                onDrop={onDrop}
                loadFile={loadFile}
                isValidating={isValidating}
                qrDataUrl={qrDataUrl}
                uploadError={uploadError}
                dropzoneStateClass={dropzoneStateClass}
              />
            </div>
            <div className="p-6 sm:p-8">
              <IdentityFieldsPanel
                embedded
                passTitle={passTitle}
                setPassTitle={setPassTitle}
                vehicleNumber={vehicleNumber}
                setVehicleNumber={setVehicleNumber}
                holderName={holderName}
                setHolderName={setHolderName}
              />
            </div>
          </div>

          <div
            className="flex flex-col justify-between gap-8 bg-zinc-950/40 p-6 sm:p-8 lg:sticky lg:top-8 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto"
            data-lenis-prevent
          >
            <LiveFrame>
              <PassPreview
                passTitle={passTitle}
                vehicleNumber={vehicleNumber}
                holderName={holderName}
                qrDataUrl={qrDataUrl}
              />
            </LiveFrame>

            <div className="relative z-20 flex flex-col gap-3">
              <motion.button
                type="button"
                onClick={() => void onWalletClick()}
                disabled={walletLoading}
                aria-busy={walletLoading}
                whileHover={
                  disableGestures || walletLoading ? undefined : { scale: 1.01 }
                }
                whileTap={
                  disableGestures || walletLoading ? undefined : { scale: 0.99 }
                }
                className="flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-zinc-100 text-[15px] font-semibold text-zinc-950 transition-colors hover:bg-white enabled:cursor-pointer disabled:cursor-wait disabled:opacity-70 sm:h-[3.25rem]"
              >
                <WalletIcon className="h-5 w-5 shrink-0" />
                {walletLoading ? "Preparing pass…" : "Add to Apple Wallet"}
              </motion.button>
              <AnimatePresence>
                {walletError && (
                  <motion.p
                    key="wallet-err"
                    role="alert"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-center text-sm text-red-300/90"
                  >
                    {walletError}
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {walletMessage && !walletError && (
                  <motion.p
                    key="wallet-ok"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-center text-sm text-zinc-400"
                  >
                    {walletMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
