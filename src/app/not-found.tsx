export default function NotFound() {
  return (
    <div className="content-shell">
      <div className="not-found">
        <p className="eyebrow">404 · Page not found</p>
        <h1>That page isn’t here.</h1>
        <p>The address may have changed or the page may not exist.</p>
        <a className="button-link" href="/">
          Return to the Castvane homepage
        </a>
      </div>
    </div>
  );
}
