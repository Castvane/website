import { navigation } from "@/config/navigation";
import { site } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner mx-auto max-w-7xl px-6">
        <a className="brand-link" href="/" aria-label="Castvane home">
          <picture>
            <source srcSet="/logos/castvane-dark.svg" media="(prefers-color-scheme: dark)" />
            <img src="/logos/castvane-light.svg" alt="Castvane" width="212" height="50" />
          </picture>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a className="nav-github" href={site.github}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
