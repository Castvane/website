import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const routes = ["/", "/about/", "/roadmap/", "/community/", "/security/"];
const widths = [320, 375, 768, 1024, 1440, 1920];

test("all public pages have complete metadata and pass axe WCAG 2.2 AA checks", async ({
  page,
}) => {
  for (const scheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    for (const route of routes) {
      await page.goto(route);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://castvane.stream${route}`,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations, `${scheme} ${route} accessibility violations`).toEqual([]);
    }
  }
});

test("all routes fit the required viewport widths; homepage screenshots are saved for review", async ({
  page,
}) => {
  await mkdir("test-results/screenshots", { recursive: true });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(
        dimensions.document,
        `horizontal overflow at ${width}px on ${route}`,
      ).toBeLessThanOrEqual(dimensions.viewport);
      if (route === "/") {
        await page.screenshot({
          path: `test-results/screenshots/home-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});

test("the homepage content is present with JavaScript disabled", async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Open-source streaming infrastructure",
  );
  await expect(page.getByRole("link", { name: "View the roadmap" })).toBeVisible();
  await page.close();
});

test("keyboard navigation exposes the skip link and main navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Castvane home" })).toBeFocused();
});

test("system light and dark preferences update the page palette", async ({ browser }) => {
  const light = await browser.newPage({ colorScheme: "light" });
  await light.goto("/");
  await expect(light.locator("body")).toHaveCSS("background-color", "rgb(246, 248, 252)");
  await light.close();

  const dark = await browser.newPage({ colorScheme: "dark" });
  await dark.goto("/");
  await expect(dark.locator("body")).toHaveCSS("background-color", "rgb(11, 18, 32)");
  await expect(dark.locator('picture source[media="(prefers-color-scheme: dark)"]')).toHaveCount(2);
  await dark.close();
});

test("internal navigation targets resolve and security and SEO files are available", async ({
  page,
  request,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((items) =>
        items.map((item) => (item as HTMLAnchorElement).getAttribute("href")),
      );
    for (const href of new Set(links)) {
      if (!href || href.startsWith("/#") || href === "/#main-content") continue;
      const response = await request.get(href);
      expect(response.status(), `${route} -> ${href}`).toBeLessThan(400);
    }
  }

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("https://castvane.stream/sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("https://castvane.stream/roadmap/");
  const security = await request.get("/.well-known/security.txt");
  expect(security.ok()).toBeTruthy();
  expect(await security.text()).toContain("Contact: mailto:security@castvane.stream");

  if (process.env.PLAYWRIGHT_USE_PREVIEW) {
    const homepage = await request.get("/");
    const headers = homepage.headers();
    expect(headers["content-security-policy"]).toContain("script-src 'self'");
    expect(headers["content-security-policy"]).not.toContain("unsafe-inline");
    expect(headers["strict-transport-security"]).toContain("max-age=31536000");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
  }
});

test("structured data names the project and official organization", async ({ page }) => {
  await page.goto("/");
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
  expect(
    schemas.some(
      (schema) =>
        schema["@type"] === "Organization" &&
        schema.name === "Castvane" &&
        schema.sameAs.includes("https://github.com/Castvane"),
    ),
  ).toBeTruthy();
  expect(
    schemas.some(
      (schema) => schema["@type"] === "WebSite" && schema.url === "https://castvane.stream/",
    ),
  ).toBeTruthy();
});

test("custom not-found page returns a 404 status", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "That page isn’t here." })).toBeVisible();
});
