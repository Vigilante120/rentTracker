import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup, verifyOtp } from "../services/auth.js";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState("signup");
  const [form, setForm] = useState({ email: "", password: "", confirm_password: "", full_name: "" });
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const { confirm_password, ...payload } = form;
      await signup(payload);
      setStep("verify");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed.");
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await verifyOtp({ email: form.email, code });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass w-full max-w-md rounded-3xl p-8 shadow-card">
        <h1 className="font-display text-3xl">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">
          {step === "signup" ? "Start tracking in less than a minute." : "Enter the code sent to your email."}
        </p>

        {error && <p className="mt-4 rounded-xl bg-coral/10 px-4 py-2 text-sm text-coral">{error}</p>}

        {step === "signup" ? (
          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2"
              name="full_name"
              placeholder="Full name"
              value={form.full_name}
              onChange={handleChange}
            />
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 pr-16"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 pr-16"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={form.confirm_password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button className="w-full rounded-xl bg-ink px-4 py-2 text-white hover:bg-teal transition-colors">
              Send Verification Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-2"
              placeholder="Verification code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
            <button className="w-full rounded-xl bg-ink px-4 py-2 text-white hover:bg-teal transition-colors">
              Verify & Continue
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-teal">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
