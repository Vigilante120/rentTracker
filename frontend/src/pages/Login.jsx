import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { clearToken, googleLogin, login } from "../services/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    clearToken();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("Google client ID is missing. Set VITE_GOOGLE_CLIENT_ID in frontend/.env.");
      return;
    }

    if (!window.google?.accounts?.id) {
      const timeout = setTimeout(() => {
        setError("Google Sign-In failed to load. Refresh and try again.");
      }, 1500);
      return () => clearTimeout(timeout);
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        try {
          await googleLogin({ id_token: response.credential });
          navigate("/dashboard");
        } catch (err) {
          setError(err.response?.data?.detail || "Google login failed.");
        }
      },
    });

    window.google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
      theme: "outline",
      size: "large",
      width: 320,
    });
  }, [navigate]);

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
          <p className="text-xs uppercase tracking-widest text-slate-400">Google Sign-In</p>
          <div id="googleSignIn" className="mt-3 flex justify-center" />
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <Link to="/signup" className="text-teal">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
