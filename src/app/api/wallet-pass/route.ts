import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const MAX_PAYLOAD_LEN = 8000;
const MAX_FIELD_LEN = 200;

interface SigningConfig {
  wwdrPath: string;
  certPath: string;
  keyPath: string;
  passTypeIdentifier: string;
  teamIdentifier: string;
}

function getSigningConfig(): SigningConfig | null {
  const wwdrPath = process.env.PASS_APPLE_WWDR_PATH;
  const certPath = process.env.PASS_SIGNER_CERT_PATH;
  const keyPath = process.env.PASS_SIGNER_KEY_PATH;
  const passTypeIdentifier = process.env.APPLE_PASS_TYPE_IDENTIFIER;
  const teamIdentifier = process.env.APPLE_TEAM_ID;
  const modelPassJson = path.join(
    process.cwd(),
    "pass-models",
    "fuel-pass.pass",
    "pass.json"
  );
  if (
    !wwdrPath ||
    !certPath ||
    !keyPath ||
    !passTypeIdentifier ||
    !teamIdentifier
  ) {
    return null;
  }
  if (
    !existsSync(wwdrPath) ||
    !existsSync(certPath) ||
    !existsSync(keyPath) ||
    !existsSync(modelPassJson)
  ) {
    return null;
  }
  return {
    wwdrPath,
    certPath,
    keyPath,
    passTypeIdentifier,
    teamIdentifier,
  };
}

interface WalletPassBody {
  passTitle?: string;
  vehicleNumber?: string;
  holderName?: string;
  qrPayload?: string;
}

export async function POST(req: NextRequest) {
  const signing = getSigningConfig();
  if (!signing) {
    return NextResponse.json(
      {
        code: "SIGNING_NOT_CONFIGURED",
        message:
          "Wallet pass signing is not configured on this server. Set PASS_APPLE_WWDR_PATH, PASS_SIGNER_CERT_PATH, PASS_SIGNER_KEY_PATH, APPLE_PASS_TYPE_IDENTIFIER, and APPLE_TEAM_ID.",
      },
      { status: 503 }
    );
  }

  let body: WalletPassBody;
  try {
    body = (await req.json()) as WalletPassBody;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const qrPayload = typeof body.qrPayload === "string" ? body.qrPayload.trim() : "";
  if (!qrPayload.length) {
    return NextResponse.json(
      { message: "A validated QR payload is required." },
      { status: 400 }
    );
  }
  if (qrPayload.length > MAX_PAYLOAD_LEN) {
    return NextResponse.json(
      { message: "QR payload is too long for a Wallet barcode." },
      { status: 400 }
    );
  }

  const passTitle = clampField(body.passTitle, "Fuel Pass");
  const vehicleNumber = clampField(body.vehicleNumber, "—");
  const holderName = clampField(body.holderName, "—");

  const modelPath = path.join(process.cwd(), "pass-models", "fuel-pass.pass");

  try {
    const { PKPass } = await import("passkit-generator");

    const pass = await PKPass.from(
      {
        model: modelPath,
        certificates: {
          wwdr: readFileSync(signing.wwdrPath),
          signerCert: readFileSync(signing.certPath),
          signerKey: readFileSync(signing.keyPath),
          signerKeyPassphrase: process.env.PASS_SIGNER_KEY_PASSPHRASE || undefined,
        },
      },
      {
        serialNumber: randomUUID(),
        passTypeIdentifier: signing.passTypeIdentifier,
        teamIdentifier: signing.teamIdentifier,
        description: passTitle,
      }
    );

    const titleField = pass.primaryFields.find((f) => f.key === "title");
    if (titleField) titleField.value = passTitle;

    const vehicleField = pass.secondaryFields.find((f) => f.key === "vehicle");
    if (vehicleField) vehicleField.value = vehicleNumber;

    const holderField = pass.auxiliaryFields.find((f) => f.key === "holder");
    if (holderField) holderField.value = holderName;

    pass.setBarcodes({
      format: "PKBarcodeFormatQR",
      message: qrPayload,
      messageEncoding: "utf-8",
    });

    const buffer = pass.getAsBuffer();

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": 'attachment; filename="FuelPass.pkpass"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[wallet-pass]", err);
    return NextResponse.json(
      {
        message:
          "Could not build or sign the pass. Check your certificates and pass type settings.",
      },
      { status: 500 }
    );
  }
}

function clampField(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const t = value.trim();
  if (!t.length) return fallback;
  return t.length > MAX_FIELD_LEN ? t.slice(0, MAX_FIELD_LEN) : t;
}
