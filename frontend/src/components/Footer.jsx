export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 pt-10 text-sm text-slate-500">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-ink font-semibold">RentTrack</p>
          <p className="mt-2 text-slate-500">
            Simple, human, and always on time. Built for calm money tracking.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Connect</p>
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://instagram.com/nishant.exp"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-ink hover:border-coral hover:text-coral transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="7" r="1" fill="currentColor" />
              </svg>
              nishant.exp
            </a>
            <a
              href="https://www.linkedin.com/in/nishant-bhandari-33605b201/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-ink hover:border-teal hover:text-teal transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 9.5h4v10H4v-10Zm2-5a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM10 9.5h3.8v1.4h.1c.5-.9 1.8-1.8 3.7-1.8 3 0 4.4 1.7 4.4 5.1v5.3h-4v-4.7c0-1.6-.3-2.6-1.6-2.6-1 0-1.7.7-1.9 1.4-.1.3-.1.7-.1 1.1v4.8h-4v-10Z"
                  fill="currentColor"
                />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
          <div className="mt-4 flex flex-col gap-2">
            <span className="chip">MVP live</span>
            <span className="chip">New features weekly</span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-slate-200/70 pt-6 text-xs text-slate-400 md:flex-row">
        <span>© 2026 RentTrack</span>
        <span>Built by Nishant Bhandari</span>
      </div>
    </footer>
  );
}
