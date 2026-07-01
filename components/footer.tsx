import { Github, Mail, FileText, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          Designed and architected by{" "}
          <span className="font-medium text-ink">Jakub Dyrszka</span>.
          {" "}Built with AI, systems logic, Next.js and Tailwind.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:jakub.dyrszka@gmail.com"
            aria-label="Email"
            className="text-muted transition-colors hover:text-ink"
          >
            <Mail size={16} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/jakubdyrszka-pixel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-ink"
          >
            <Github size={16} aria-hidden="true" />
          </a>
          <a
            href="https://instagram.com/pwrlft.kubus"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted transition-colors hover:text-ink"
          >
            <Instagram size={16} aria-hidden="true" />
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume PDF"
            className="text-muted transition-colors hover:text-ink"
          >
            <FileText size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
