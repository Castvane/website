import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "about/", "roadmap/", "community/", "security/"];
  return paths.map((path) => ({
    url: `${site.url}/${path}`,
    priority: path === "" ? 1 : 0.7,
  }));
}
