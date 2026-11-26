# Castvane website

The official public website for [Castvane](https://castvane.stream), an independent, open-source media streaming and management project written from scratch in Rust. The streaming engine is under active development.

The site is a static Next.js App Router export. It uses React Server Components, TypeScript strict mode, Tailwind CSS, system fonts, and Cloudflare Workers Static Assets. Navigation uses native document links; the build removes unused Next.js client runtime scripts and data files from the export, so page content and navigation work without JavaScript. It does not need a Node.js server, database, analytics, cookies, or third-party runtime services.

## Requirements

- Node.js 24 (minimum supported: 22.12)
- pnpm 11.25 or later
- A Cloudflare account with the `castvane.stream` zone for deployment

## Local development

```sh
pnpm install
pnpm dev
```

## Checks and production build

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm validate:static
```

Playwright uses Chromium. Install it locally with `pnpm exec playwright install chromium`. The test suite checks WCAG 2.2 AA rules with axe, page metadata and structured data, internal routes, responsive overflow at 320, 375, 768, 1024, 1440, and 1920 pixels, light and dark system preferences, and the custom 404 page. It saves homepage screenshots under `test-results/screenshots/` for visual review.

## Cloudflare Workers deployment

Production is configured in `wrangler.jsonc` to publish the static export in `out/` to the `castvane.stream` custom domain. Cloudflare must already have the domain zone and an active HTTPS certificate. The Worker custom domain will be provisioned by Cloudflare on the first deployment; this repository does not alter DNS, MX records, mail routing, or other zone configuration.

```sh
pnpm build
pnpm preview
```

To deploy after configuring Wrangler authentication:

```sh
pnpm deploy
```

Deployment is intentionally not run by CI. Review the Cloudflare account and custom domain binding before running it.

## Website routes

- `/` — project introduction and current development status
- `/about/` — project goals, Rust, independence, and licensing
- `/roadmap/` — structured, status-based development direction in `src/content/roadmap.ts`
- `/community/` — GitHub, issue reporting, contribution information, and contact
- `/security/` — private vulnerability disclosure instructions
- `/.well-known/security.txt` — RFC 9116 contact record

Downloads, blog, changelog, and documentation links are omitted until those public destinations are ready.

## Security headers and content policy

`public/_headers` sets the Content Security Policy and browser security headers for Workers Static Assets. The build removes executable Next.js scripts and their preloads from the static export while retaining JSON-LD data, so the CSP does not allow inline scripts or styles. Third-party scripts, fonts, images, and connections are disallowed. If the rendering output changes, re-check the policy against built pages before tightening it.

## Maintaining security.txt

RFC 9116 requires an `Expires` timestamp in the future. The current expiry is `2027-11-26T00:00:00.000Z`. Before that date, update the `Expires` field in `public/.well-known/security.txt` to a new UTC timestamp, at least once a year, and deploy the updated site. Keep the `Contact`, `Canonical`, and `Preferred-Languages` fields valid.

## Legal items to confirm before launch

No legal operator name, address, or jurisdiction was provided. The actual website operator should determine whether an imprint, privacy notice, or other operator disclosures are required in the jurisdictions where the site is operated or served. The site does not set analytics cookies or embed third-party services; outbound email links may lead users to their own email provider. This note is an unresolved launch item, not legal advice.

## Branding

Logos, favicon symbols, and the Open Graph image are copied from the provided Castvane Branding Kit. The website uses the supplied light and dark logo variants and does not alter the logo artwork. No font files are included in the kit, so the site uses the local system font stack and makes no external font requests.

## License

Original website code is licensed under the MIT License in `LICENSE`. The Castvane branding assets remain subject to their own branding and trademark terms; the software license does not grant a separate trademark license.
