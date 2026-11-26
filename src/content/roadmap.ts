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
        title: "Rust streaming core",
        summary: "Develop the independent Rust foundation for the Castvane streaming engine.",
        status: "In development",
      },
      {
        title: "Configuration and storage",
        summary: "Define how deployments configure Castvane and persist service state.",
        status: "Planned",
      },
    ],
  },
  {
    category: "Stream operations",
    items: [
      {
        title: "Process management",
        summary: "Manage media processes through a consistent service model.",
        status: "Planned",
      },
      {
        title: "Ingest and distribution",
        summary: "Plan stream ingest and delivery workflows for self-hosted deployments.",
        status: "Planned",
      },
      {
        title: "Transcoding and media processing",
        summary: "Establish media processing and transcoding workflows.",
        status: "Planned",
      },
    ],
  },
  {
    category: "API and operations",
    items: [
      {
        title: "API compatibility",
        summary:
          "Work toward compatibility with datarhei Core APIs where appropriate. Castvane is developed independently and has no affiliation with datarhei.",
        status: "Planned",
      },
      {
        title: "Authentication and authorization",
        summary: "Plan access controls for API and service operations.",
        status: "Planned",
      },
      {
        title: "Observability",
        summary: "Plan operational visibility for self-hosted service owners.",
        status: "Planned",
      },
    ],
  },
  {
    category: "Release and ecosystem",
    items: [
      {
        title: "Security hardening",
        summary: "Include security review and hardening in the project’s development work.",
        status: "Planned",
      },
      {
        title: "Container distribution",
        summary: "Plan a container-based distribution path when the core is ready.",
        status: "Planned",
      },
      {
        title: "Documentation",
        summary: "Build practical documentation as the project’s interfaces take shape.",
        status: "Planned",
      },
      {
        title: "Future web interface",
        summary: "Consider a web interface for managing a Castvane deployment.",
        status: "Planned",
      },
    ],
  },
];
