import { siteDeveloper } from "@/lib/site-config";

interface SiteFooterProps {
  tagline: string;
  /** Extra space above the footer (Tailwind class, e.g. mt-20). */
  marginTopClass?: string;
}

export function SiteFooter({
  tagline,
  marginTopClass = "mt-20",
}: Readonly<SiteFooterProps>) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${marginTopClass} border-t border-zinc-800/80 pt-10 text-center`}
    >
      <p className="text-xs text-zinc-600">{tagline}</p>
      <p className="mt-4 text-xs text-zinc-500">
        <span className="text-zinc-600">Developer · </span>
        <span className="font-medium text-zinc-400">
          {siteDeveloper.displayName}
        </span>
        {siteDeveloper.links.map((link) => (
          <span key={link.href}>
            <span aria-hidden className="mx-2 text-zinc-700">
              ·
            </span>
            <a
              href={link.href}
              className="text-zinc-500 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-zinc-300"
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          </span>
        ))}
      </p>
      <p className="mt-3 text-xs text-zinc-600">© {year} Fuel Pass</p>
    </footer>
  );
}
