import { useState } from "react";

export default function OwedForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", number: "", amount: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm({ name: "", number: "", amount: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lilac/70"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky/70"
          name="number"
          placeholder="Number"
          value={form.number}
          onChange={handleChange}
          required
        />
      </div>
      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blush"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        type="number"
        min="0"
        step="0.01"
        required
      />
      <button className="w-full rounded-xl bg-teal px-4 py-2 text-white shadow-glow hover:opacity-90 transition">
        Add Money Owed
      </button>
    </form>
  );
}
