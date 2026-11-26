import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Security",
  "How to report a suspected security vulnerability in Castvane privately and responsibly.",
  "/security/",
);

export default function SecurityPage() {
  return (
    <div className="content-shell">
      <PageHeading
        eyebrow="Responsible disclosure"
        title="Report security issues privately."
        intro="If you believe you have found a vulnerability affecting Castvane, please report it directly to the security contact."
        path="/security/"
      />
      <div className="prose">
        <h2>How to report</h2>
        <p>
          Send a description of the suspected vulnerability and any information needed to understand
          or reproduce it to:
        </p>
        <p>
          <a className="security-address" href={`mailto:${site.securityEmail}`}>
            {site.securityEmail}
          </a>
        </p>
        <p>
          Please do not report suspected vulnerabilities through public GitHub issues. Private
          disclosure gives the project an opportunity to review the report before technical details
          are public.
        </p>

        <h2>What to include</h2>
        <p>
          Include the affected repository or component, the conditions required to reproduce the
          issue, and a description of its potential impact. Avoid including real user data or
          secrets in a report.
        </p>

        <h2>After reporting</h2>
        <p>
          The project will review reports as its capacity allows. No response time, bounty, or
          security guarantee has been established.
        </p>
        <div className="callout">
          <p>
            The expiration date in <a href="/.well-known/security.txt">security.txt</a> must be
            renewed before it expires. See the repository README for the maintenance procedure.
          </p>
        </div>
      </div>
    </div>
  );
}
