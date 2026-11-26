import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { roadmap } from "@/content/roadmap";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Development roadmap",
  "See the development direction for Castvane’s Rust streaming engine. Roadmap statuses reflect known project information; no release dates are announced.",
  "/roadmap/",
);

export default function RoadmapPage() {
  return (
    <div className="content-shell">
      <PageHeading
        eyebrow="Development"
        title="Roadmap"
        intro="A view of the work Castvane is moving toward. The engine is under active development, and the scope may change as implementation progresses."
        path="/roadmap/"
      />
      <p className="roadmap-intro-note">
        Statuses describe current public information. No completion percentages or release dates are
        published.
      </p>
      {roadmap.map((group) => (
        <section
          className="roadmap-group"
          key={group.category}
          aria-labelledby={`roadmap-${group.category.replaceAll(" ", "-").toLowerCase()}`}
        >
          <h2 id={`roadmap-${group.category.replaceAll(" ", "-").toLowerCase()}`}>
            {group.category}
          </h2>
          {group.items.map((item) => (
            <article className="roadmap-row" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="roadmap-status" data-status={item.status}>
                {item.status}
              </span>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
