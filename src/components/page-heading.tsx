type PageHeadingProps = { eyebrow: string; title: string; intro: string; path: string };

export function PageHeading({ eyebrow, title, intro, path }: PageHeadingProps) {
  const breadcrumb = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://castvane.stream/" },
    { "@type": "ListItem", position: 2, name: title, item: `https://castvane.stream${path}` },
  ];

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumb,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <div className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro">{intro}</p>
      </div>
    </>
  );
}
