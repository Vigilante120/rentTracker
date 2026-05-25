import { useState } from "react";

export default function RentForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    number: "",
    product_detail: "",
    rent_duration_days: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      rent_duration_days: Number(form.rent_duration_days),
    });
    setForm({ name: "", number: "", product_detail: "", rent_duration_days: "" });
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
      <textarea
        className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blush"
        name="product_detail"
        placeholder="Product detail"
        value={form.product_detail}
        onChange={handleChange}
        rows={3}
        required
      />
      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime/70"
        name="rent_duration_days"
        placeholder="Rent time (days)"
        value={form.rent_duration_days}
        onChange={handleChange}
        type="number"
        min="1"
        required
      />
      <button className="w-full rounded-xl bg-teal px-4 py-2 text-white shadow-glow hover:opacity-90 transition">
        Add Rent
      </button>
    </form>
  );
}
