import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Community and contributions",
  "Find the Castvane GitHub organization, report issues, suggest improvements, and learn how to get involved.",
  "/community/",
);

export default function CommunityPage() {
  return (
    <div className="content-shell">
      <PageHeading
        eyebrow="Open source"
        title="Build in the open."
        intro="Castvane is developed in public. The project is early, and community feedback can help shape its direction."
        path="/community/"
      />
      <div className="community-links">
        <section className="community-link">
          <h2>GitHub organization</h2>
          <p>Browse the Castvane project repositories and follow development.</p>
          <a href={site.github}>
            Visit Castvane on GitHub <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="community-link">
          <h2>Report a bug</h2>
          <p>
            Use the Core repository’s issue tracker for reproducible bugs and project questions.
          </p>
          <a href={`${site.coreRepository}/issues/new`}>
            Open a Core issue <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="community-link">
          <h2>Suggest an improvement</h2>
          <p>
            Describe the use case and the problem you want to solve in a Core issue. For security
            concerns, use the private contact on the security page.
          </p>
          <a href={`${site.coreRepository}/issues/new`}>
            Suggest an improvement <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="community-link">
          <h2>Contribute</h2>
          <p>
            Start with the Core repository. Contribution guidance is still being established; open
            an issue to discuss substantial changes before beginning work.
          </p>
          <a href={site.coreRepository}>
            Explore the Core repository <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="community-link">
          <h2>License</h2>
          <p>Castvane software is licensed under the MIT License.</p>
          <a href={`${site.coreRepository}/blob/main/LICENSE`}>
            Read the license <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="community-link">
          <h2>General contact</h2>
          <p>For general project inquiries, contact the Castvane team by email.</p>
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </section>
      </div>
    </div>
  );
}
