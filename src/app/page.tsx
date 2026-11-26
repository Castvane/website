import { site } from "@/config/site";

const direction = [
  ["01", "Self-hosted infrastructure", "Designed to run on infrastructure you control."],
  [
    "02",
    "Stream ingest and distribution",
    "A direction for managing how media enters and reaches viewers.",
  ],
  [
    "03",
    "Media processing",
    "Transcoding and processing are project goals, not available features today.",
  ],
  [
    "04",
    "API-driven management",
    "An API-oriented architecture, with compatibility work still planned.",
  ],
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-inner mx-auto max-w-7xl px-6">
          <div>
            <p className="eyebrow">Independent · Open source · In active development</p>
            <h1 className="hero-title">
              Open-source streaming infrastructure, <em>built with Rust.</em>
            </h1>
            <p className="hero-copy">
              Castvane is an independent, self-hosted media streaming and management project. Its
              streaming engine is being built from scratch in Rust.
            </p>
            <div className="hero-actions">
              <a className="button-link" href={site.github}>
                Explore Castvane on GitHub <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="/roadmap/">
                View the roadmap <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="active-note">
              <span className="status-dot" aria-hidden="true" /> Under active development ·
              implementation is in progress
            </p>
          </div>
          <div className="hero-art">
            <picture>
              <source
                srcSet="/logos/castvane-symbol-dark.svg"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="/logos/castvane-symbol-light.svg"
                alt="Castvane symbol: a C-shaped ribbon with a play mark and broadcast waves"
                width="260"
                height="260"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="home-section mx-auto max-w-7xl px-6" aria-labelledby="direction-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">Project direction</p>
            <h2 id="direction-title">Media infrastructure you can run yourself.</h2>
          </div>
          <p>
            Castvane is being developed as a self-hosted foundation for managing media streams. The
            capabilities below describe the intended direction; implementation is ongoing and they
            should not be read as available features.
          </p>
        </div>
        <div className="direction-list">
          {direction.map(([number, title, summary]) => (
            <article className="direction-item" key={number}>
              <span className="direction-index">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section mx-auto max-w-7xl px-6" aria-label="Project details">
        <dl className="status-strip">
          <div>
            <dt>Core</dt>
            <dd>Rust · independent implementation</dd>
          </div>
          <div>
            <dt>License</dt>
            <dd>MIT</dd>
          </div>
          <div>
            <dt>Development</dt>
            <dd>Active development</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
