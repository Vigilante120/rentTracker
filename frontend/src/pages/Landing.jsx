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
      <section className="hero-grid rounded-3xl p-10 md:p-16 glass shadow-card shimmer-panel animate-shimmer">
        <div className="max-w-2xl">
          <span className="chip">RentTrack MVP</span>
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
              className="rounded-full bg-teal px-6 py-3 text-white shadow-glow hover:opacity-90 transition"
            >
              Start Tracking
            </a>
            <a
              href="/login"
              className="rounded-full border border-ink/30 px-6 py-3 text-ink hover:border-teal hover:text-teal transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Live countdowns",
            body: "Every rent item gets a clock that flips from days to hours so you never miss a deadline.",
          },
          {
            title: "Debt clarity",
            body: "Keep a focused list of who owes you and move settled accounts into a clean history feed.",
          },
          {
            title: "Quiet notifications",
            body: "Alerts surface only when it matters, keeping the dashboard calm even on busy days.",
          },
        ].map((feature) => (
          <div key={feature.title} className="glass rounded-3xl p-6 shadow-card neo-border">
            <h3 className="font-semibold text-lg text-ink">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-8 shadow-card neo-border">
          <span className="chip">How it works</span>
          <h2 className="mt-4 font-display text-3xl">Three calm steps</h2>
          <ol className="mt-6 space-y-4 text-sm text-slate-600">
            <li>1. Add a rent item or debt with contact details.</li>
            <li>2. Track the timer and see what needs attention.</li>
            <li>3. Clear the debt and archive the record automatically.</li>
          </ol>
        </div>
        <div className="glass rounded-3xl p-8 shadow-card neo-border">
          <span className="chip">Pricing</span>
          <h2 className="mt-4 font-display text-3xl">Free while we build</h2>
          <p className="mt-4 text-sm text-slate-600">
            This MVP is open for early users. Share feedback and unlock future pro features as they launch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="chip">Unlimited items</span>
            <span className="chip">Email OTP</span>
            <span className="chip">Google Sign-In</span>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl">Loved by detail-obsessed renters</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-8 shadow-card neo-border">
          <span className="chip">FAQ</span>
          <h2 className="mt-4 font-display text-3xl">Quick answers</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-ink">Do I need a spreadsheet?</p>
              <p>No. RentTrack replaces sheets with a focused dashboard and reminders.</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Is data private?</p>
              <p>Yes. Each account is isolated and only visible to the signed-in user.</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Can I share with a team?</p>
              <p>Team spaces are on the roadmap. Early users will get priority access.</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-3xl p-8 shadow-card neo-border">
          <span className="chip">Ready to go</span>
          <h2 className="mt-4 font-display text-3xl">Start tracking today</h2>
          <p className="mt-4 text-sm text-slate-600">
            Keep rent, debt, and reminders together. It takes less than a minute to start.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="rounded-full bg-teal px-6 py-3 text-white shadow-glow hover:opacity-90 transition"
            >
              Create account
            </a>
            <a
              href="/login"
              className="rounded-full border border-ink/30 px-6 py-3 text-ink hover:border-teal hover:text-teal transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
