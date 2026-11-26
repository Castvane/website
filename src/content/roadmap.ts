export type RoadmapStatus = "Planned" | "In development" | "Completed";

export type RoadmapItem = {
  title: string;
  summary: string;
  status: RoadmapStatus;
};

export const roadmap: { category: string; items: RoadmapItem[] }[] = [
  {
    category: "Core foundation",
    items: [
      {
        title: "Rust API and configuration foundation",
        summary:
          "Core 0.1.0 includes a Rust API v3 foundation, SQLite-backed configuration, local JWT login and structured logging. The package version does not imply full legacy API compatibility.",
        status: "Completed",
      },
      {
        title: "Configuration and storage",
        summary:
          "Transactional configuration and disk, memory and S3 mounts are implemented, including bounded filesystem operations and HTTP range delivery.",
        status: "Completed",
      },
    ],
  },
  {
    category: "Processes and media",
    items: [
      {
        title: "FFmpeg process management",
        summary:
          "The single-node engine creates, probes, schedules and supervises FFmpeg jobs, with persisted desired state and reports. It requires external FFmpeg/FFprobe; implementation and automated verification are complete, while browser acceptance remains open.",
        status: "Completed",
      },
      {
        title: "Ingest and distribution",
        summary:
          "HLS/DASH delivery, viewer sessions, RTMP/RTMPS and SRT support are implemented. Native transports require the separately installed MediaMTX companion; UI/browser acceptance remains open.",
        status: "Completed",
      },
      {
        title: "Transcoding and media processing",
        summary:
          "FFmpeg jobs can process media and generate HLS/DASH output. Remaining live playout controls and broader client compatibility are still in development.",
        status: "In development",
      },
    ],
  },
  {
    category: "API and operations",
    items: [
      {
        title: "Legacy API v3 compatibility",
        summary:
          "Core implements selected configuration, process, media and operations routes. Full parity is not claimed: pinned UI version gates and manual browser acceptance still block complete dashboard compatibility. Castvane is independent and unaffiliated with datarhei.",
        status: "In development",
      },
      {
        title: "Authentication and authorization",
        summary:
          "Local JWT login, managed identities, scoped policies and zone reservations are implemented. Auth0 federation and some legacy IAM forms remain compatibility gaps.",
        status: "In development",
      },
      {
        title: "Observability",
        summary:
          "Health/readiness routes, resource and Prometheus metrics, bounded logs/events and audit history are implemented. Some reference-specific metrics and event details remain open.",
        status: "In development",
      },
    ],
  },
  {
    category: "Release and future work",
    items: [
      {
        title: "Security hardening",
        summary:
          "Request policies, process restrictions, managed TLS and optional ACME support are present. Security review and production validation remain ongoing work.",
        status: "In development",
      },
      {
        title: "Container distribution",
        summary:
          "A supported container image and distribution workflow have not yet been published.",
        status: "Planned",
      },
      {
        title: "Public documentation site",
        summary:
          "The Core repository now contains README, phase and API documentation. A hosted operator documentation site and broader release/install guidance remain future work.",
        status: "In development",
      },
      {
        title: "Future web interface",
        summary:
          "A Castvane-managed web interface has not been published; existing Restreamer UI compatibility is tracked separately above.",
        status: "Planned",
      },
      {
        title: "Clustered and distributed Core",
        summary:
          "Consensus, node enrollment, replication, multi-node scheduling and failover remain future work.",
        status: "Planned",
      },
    ],
  },
];
