import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import RentForm from "../components/RentForm.jsx";
import OwedForm from "../components/OwedForm.jsx";
import DebtTable from "../components/DebtTable.jsx";
import api from "../services/api.js";
import { clearToken } from "../services/auth.js";

const formatCountdown = (milliseconds) => {
  if (milliseconds <= 0) return "00:00";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  if (days >= 1) {
    return `${days}d`;
  }

  const hours = String(totalHours).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [rentItems, setRentItems] = useState([]);
  const [debts, setDebts] = useState([]);
  const [debtHistory, setDebtHistory] = useState([]);
  const [tick, setTick] = useState(0);
  const [error, setError] = useState("");

  const upcomingEnding = useMemo(
    () => rentItems.filter((item) => new Date(item.end_date).getTime() - Date.now() <= 0),
    [rentItems, tick]
  );

  const sortedRentItems = useMemo(() => {
    return [...rentItems].sort((first, second) => {
      const firstRemaining = new Date(first.end_date).getTime() - Date.now();
      const secondRemaining = new Date(second.end_date).getTime() - Date.now();
      return firstRemaining - secondRemaining;
    });
  }, [rentItems, tick]);

  useEffect(() => {
    const interval = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [rentResponse, debtResponse, historyResponse] = await Promise.all([
        api.get("/rent-items/"),
        api.get("/owed-money/"),
        api.get("/owed-money-history/"),
      ]);
      setRentItems(rentResponse.data);
      setDebts(debtResponse.data);
      setDebtHistory(historyResponse.data);
    } catch (err) {
      setError("Failed to load dashboard data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddRent = async (payload) => {
    setError("");
    try {
      const response = await api.post("/rent-items/", payload);
      setRentItems((prev) => [response.data, ...prev]);
    } catch (err) {
      setError("Could not add rent item.");
    }
  };

  const handleAddDebt = async (payload) => {
    setError("");
    try {
      const response = await api.post("/owed-money/", payload);
      setDebts((prev) => [response.data, ...prev]);
    } catch (err) {
      setError("Could not add debt.");
    }
  };

  const handleClearDebt = async (id) => {
    setError("");
    try {
      await api.patch(`/owed-money/${id}/`, { is_cleared: true });
      await loadData();
      setDebts((prev) => prev.filter((debt) => debt.id !== id));
    } catch (err) {
      setError("Could not clear debt.");
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen px-6 py-10 md:px-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="chip">Dashboard</span>
          <h1 className="font-display text-3xl">Your rent & debt control center</h1>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-ink/30 px-4 py-2 text-ink hover:border-coral hover:text-coral transition-colors"
        >
          Log out
        </button>
      </header>

      {error && <p className="mt-6 rounded-xl bg-coral/10 px-4 py-2 text-sm text-coral">{error}</p>}

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6 shadow-card neo-border">
          <h2 className="text-lg font-semibold">Add Rent</h2>
          <p className="text-sm text-slate-500">Track a rented item and start the countdown.</p>
          <div className="mt-4">
            <RentForm onSubmit={handleAddRent} />
          </div>
        </div>
        <div className="glass rounded-3xl p-6 shadow-card neo-border">
          <h2 className="text-lg font-semibold">Add Money Owed</h2>
          <p className="text-sm text-slate-500">Log a debt and stay on top of collections.</p>
          <div className="mt-4">
            <OwedForm onSubmit={handleAddDebt} />
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 shadow-card lg:col-span-2 neo-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Rent Items</h3>
            <span className="text-sm text-slate-500">{rentItems.length} active</span>
          </div>
          <div className="mt-4 space-y-4">
            {sortedRentItems.length === 0 ? (
              <p className="text-sm text-slate-500">No rent items yet.</p>
            ) : (
              sortedRentItems.map((item) => {
                const remaining = new Date(item.end_date).getTime() - Date.now();
                const endDate = formatDate(item.end_date);
                return (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-ink">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.product_detail}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded-full bg-lilac/30 px-3 py-1 text-xs text-ink">
                          {formatCountdown(remaining)}
                        </span>
                        <p className="mt-2 text-xs text-slate-500">Ends {endDate}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{item.number}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="glass rounded-3xl p-6 shadow-card neo-border">
          <h3 className="text-lg font-semibold">Upcoming Ending Rent</h3>
          <p className="text-sm text-slate-500">Alerts when rent time hits zero.</p>
          <div className="mt-4 space-y-3">
            {upcomingEnding.length === 0 ? (
              <p className="text-sm text-slate-500">Nothing ending right now.</p>
            ) : (
              upcomingEnding.map((item) => (
                <div key={item.id} className="rounded-2xl border border-coral/40 bg-coral/10 p-3">
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-slate-600">{item.product_detail}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Debts</h3>
          <span className="text-sm text-slate-500">{debts.length} outstanding</span>
        </div>
        <div className="mt-4">
          <DebtTable debts={debts} onClear={handleClearDebt} />
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cleared History</h3>
          <span className="text-sm text-slate-500">{debtHistory.length} cleared</span>
        </div>
        <div className="mt-4 space-y-3">
          {debtHistory.length === 0 ? (
            <p className="text-sm text-slate-500">No cleared debts yet.</p>
          ) : (
            debtHistory.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">₹{item.amount}</p>
                    <p className="text-xs text-slate-500">{formatDate(item.cleared_at)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
