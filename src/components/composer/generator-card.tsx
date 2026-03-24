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
  const [passTitle, setPassTitle] = useState("Fuel Pass");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [success, setSuccess] = useState(false);
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

  const onWalletClick = () => {
    setSuccess(true);
    globalThis.setTimeout(() => setSuccess(false), 2200);
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

            <div className="flex flex-col gap-3">
              <motion.button
                type="button"
                onClick={onWalletClick}
                whileHover={disableGestures ? undefined : { scale: 1.01 }}
                whileTap={disableGestures ? undefined : { scale: 0.99 }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-100 text-[15px] font-semibold text-zinc-950 transition-colors hover:bg-white sm:h-[3.25rem]"
              >
                <WalletIcon className="h-5 w-5" />
                Add to Apple Wallet
              </motion.button>
              <AnimatePresence>
                {success && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-center text-sm text-zinc-500"
                  >
                    Ready when you connect issuance for signed passes.
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
