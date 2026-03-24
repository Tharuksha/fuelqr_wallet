import jsQR from "jsqr";

export type QrValidateResult =
  | { ok: true; dataUrl: string }
  | { ok: false; reason: string };

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Invalid read result"));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

function decodeQrFromImage(
  img: HTMLImageElement,
  maxEdge: number
): ReturnType<typeof jsQR> | null {
  const w0 = img.naturalWidth;
  const h0 = img.naturalHeight;
  if (!w0 || !h0) return null;

  let w = w0;
  let h = h0;
  if (w > maxEdge || h > maxEdge) {
    const scale = maxEdge / Math.max(w, h);
    w = Math.max(1, Math.round(w * scale));
    h = Math.max(1, Math.round(h * scale));
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  return jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "attemptBoth",
  });
}

/** Reads the file in the browser and checks that a QR code can be read from it. */
export async function validateQrImageFile(file: File): Promise<QrValidateResult> {
  if (!file.type.startsWith("image/")) {
    return {
      ok: false,
      reason: "Please upload an image file (PNG, JPG, or WebP).",
    };
  }

  let dataUrl: string;
  try {
    dataUrl = await readFileAsDataUrl(file);
  } catch {
    return {
      ok: false,
      reason: "Could not read this file. Try another image.",
    };
  }

  let img: HTMLImageElement;
  try {
    img = await loadImageElement(dataUrl);
  } catch {
    return {
      ok: false,
      reason: "This file is not a valid image.",
    };
  }

  const maxEdges = [2048, 1536, 1024, 768, 512, 4096];
  const seen = new Set<number>();

  for (const maxEdge of maxEdges) {
    if (seen.has(maxEdge)) continue;
    seen.add(maxEdge);
    const result = decodeQrFromImage(img, maxEdge);
    if (result) {
      return { ok: true, dataUrl };
    }
  }

  return {
    ok: false,
    reason:
      "No QR code found in this image. Upload a clear photo or screenshot of a QR code.",
  };
}
