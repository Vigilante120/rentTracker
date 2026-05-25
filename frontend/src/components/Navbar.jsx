import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link to="/" className="text-xl font-semibold tracking-tight">
        RentTrack
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/login" className="hover:text-teal transition-colors">
          Login
        </Link>
        <Link
          to="/signup"
          className="rounded-full bg-ink px-4 py-2 text-white hover:bg-teal transition-colors"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
