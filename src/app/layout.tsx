import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Castvane – Open-Source Streaming Infrastructure in Rust",
    template: "%s | Castvane",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Castvane – Open-Source Streaming Infrastructure in Rust",
    description: site.description,
    url: "/",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Castvane — open-source streaming infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Castvane – Open-Source Streaming Infrastructure in Rust",
    description: site.description,
    images: ["/open-graph.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/logos/castvane-light.svg`,
    sameAs: [site.github],
    email: site.contactEmail,
    description: site.description,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    publisher: { "@type": "Organization", name: site.name, url: `${site.url}/` },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
