import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner mx-auto max-w-7xl px-6">
        <p>Independent open-source streaming infrastructure.</p>
        <div className="footer-links">
          <a href="/security/">Security</a>
          <a href={`mailto:${site.contactEmail}`}>Contact</a>
          <a href={site.github}>GitHub</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Castvane · MIT License</p>
      </div>
    </footer>
  );
}
