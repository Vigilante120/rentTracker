export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-500">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <p>RentTrack. Simple, human, and always on time.</p>
        <a
          href="https://instagram.com/nishant.exp"
          target="_blank"
          rel="noreferrer"
          className="text-ink hover:text-coral transition-colors"
        >
          Instagram: nishant.exp
        </a>
      </div>
    </footer>
  );
}
