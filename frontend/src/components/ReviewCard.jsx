export default function ReviewCard({ name, quote }) {
  return (
    <div className="glass rounded-2xl p-6 shadow-card animate-floatIn">
      <div className="text-coral text-lg">★★★★★</div>
      <p className="mt-3 text-sm text-slate-600">{quote}</p>
      <p className="mt-4 text-sm font-semibold text-ink">{name}</p>
    </div>
  );
}
