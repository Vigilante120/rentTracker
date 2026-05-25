import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { googleLogin, login } from "../services/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [googleToken, setGoogleToken] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed.");
    }
  };

  const handleGoogle = async () => {
    setError("");
    if (!googleToken) {
      setError("Paste a Google ID token to continue.");
      return;
    }
    try {
      await googleLogin({ id_token: googleToken });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass w-full max-w-md rounded-3xl p-8 shadow-card">
        <h1 className="font-display text-3xl">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Pick up right where your tracking left off.</p>

        {error && <p className="mt-4 rounded-xl bg-coral/10 px-4 py-2 text-sm text-coral">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="w-full rounded-xl bg-ink px-4 py-2 text-white hover:bg-teal transition-colors">
            Login
          </button>
        </form>

        <div className="mt-6">
          <label className="text-xs uppercase tracking-widest text-slate-400">Google ID token</label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Paste Google ID token"
            value={googleToken}
            onChange={(event) => setGoogleToken(event.target.value)}
          />
          <button
            onClick={handleGoogle}
            className="mt-3 w-full rounded-xl border border-ink px-4 py-2 text-ink hover:border-teal hover:text-teal transition-colors"
          >
            Login with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <Link to="/signup" className="text-teal">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
