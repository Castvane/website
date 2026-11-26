import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path,
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
      title,
      description,
      images: ["/open-graph.png"],
    },
  };
}
