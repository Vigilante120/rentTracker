import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link to="/" className="text-xl font-semibold tracking-tight text-ink">
        RentTrack
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/login" className="hover:text-teal transition-colors text-slate-600">
          Login
        </Link>
        <Link
          to="/signup"
          className="rounded-full bg-teal px-4 py-2 text-white shadow-glow hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
