import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ReviewCard from "../components/ReviewCard.jsx";

const reviews = [
  {
    name: "Sanjana M.",
    quote: "The reminders feel like a personal assistant. I never miss a due date now.",
  },
  {
    name: "Aditya K.",
    quote: "Simple, clean, and way faster than my old spreadsheet routine.",
  },
  {
    name: "Riya S.",
    quote: "The countdown tiles keep me honest. Love the calm design too.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen px-6 md:px-16">
      <Navbar />
      <section className="hero-grid rounded-3xl p-10 md:p-16 glass shadow-card">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-teal">RentTrack MVP</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl leading-tight text-ink">
            Tracker and notifications for when rent is due or a payment needs to be collected.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Keep every rental and debt visible, with instant alerts and a dashboard that stays calm even when money gets
            messy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="rounded-full bg-ink px-6 py-3 text-white hover:bg-teal transition-colors"
            >
              Start Tracking
            </a>
            <a
              href="/login"
              className="rounded-full border border-ink px-6 py-3 text-ink hover:border-teal hover:text-teal transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl">Loved by detail-obsessed renters</h2>
          <span className="text-sm text-slate-500">Hardcoded 5-star love</span>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
