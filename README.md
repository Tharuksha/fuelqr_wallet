# Fuel Pass

A small web app for designing a fuel-related digital pass that looks like an Apple Wallet card. You upload an image with a QR code, the app checks the code in your browser, then you edit the pass text and see a live preview.

Nothing in the demo sends your image or form data to a server for decoding—that stays on your device until you wire up your own backend.

## Run it locally

You need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page is the marketing view; **Compose** (`/compose`) is where you upload and build the pass. **How it works** explains the flow in English and Sinhala.

Other commands:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## What’s inside (rough map)

- **`src/app/`** — Pages and the root layout (Next.js App Router).
- **`src/components/layout/`** — Header, footer, smooth scroll, page transitions.
- **`src/components/pwa/`** — Service worker registration for installable web app behavior.
- **`src/components/landing/`** — Home page sections.
- **`src/components/composer/`** — Upload, QR check, preview, and related UI.
- **`src/app/how-it-works/`** — Bilingual guide route; `_components/` and `_lib/` hold the view and copy.
- **`src/hooks/`** — Shared React hooks (hydration, motion safety).
- **`src/lib/`** — Site config and the in-browser QR helper.

## Stack

[Next.js](https://nextjs.org/) (React), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) for scroll, [jsQR](https://github.com/cozmo/jsQR) for reading QR codes in the browser.

Built with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app); fonts are loaded with `next/font` (Geist and Syne).

## Deploy

You can host it like any Next.js app—for example on [Vercel](https://vercel.com/) or your own Node host. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) if you need the details.
