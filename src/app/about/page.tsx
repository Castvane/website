import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About",
  "Learn about Castvane, an independent open-source streaming and media management project built from scratch in Rust.",
  "/about/",
);

export default function AboutPage() {
  return (
    <div className="content-shell">
      <PageHeading
        eyebrow="About the project"
        title="Built independently, for self-hosted media infrastructure."
        intro="Castvane is an open-source streaming and media management project whose engine is under active development."
        path="/about/"
      />
      <div className="prose">
        <h2>What Castvane is</h2>
        <p>
          Castvane is being developed as infrastructure for operating media streams on systems you
          control. The project is independent and written from scratch in Rust. Its intended scope
          includes stream management, ingest and distribution, media processing, and an API-driven
          service model.
        </p>

        <h2>Why it is being developed</h2>
        <p>
          Self-hosting gives operators control over where their streaming infrastructure runs and
          how it fits into their systems. Castvane aims to provide an open-source option for that
          work, with its implementation and direction developed in the open.
        </p>

        <h2>Why Rust</h2>
        <p>
          Rust is the language chosen for the core engine. Its type system and memory-safety model
          offer useful tools for building systems software. Castvane does not claim measured
          performance or security advantages over other projects.
        </p>

        <h2>Independent development</h2>
        <p>
          Castvane aims for API compatibility with datarhei Core where appropriate, while being
          independently developed from scratch. It is not an official fork or successor and is not
          affiliated with datarhei.
        </p>

        <h2>License</h2>
        <p>
          Castvane software is licensed under the MIT License. The project’s software license does
          not grant a separate license to its name or branding.
        </p>
      </div>
    </div>
  );
}
