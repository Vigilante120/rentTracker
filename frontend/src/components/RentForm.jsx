import { useState } from "react";

export default function RentForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    number: "",
    product_detail: "",
    rent_duration_minutes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      rent_duration_minutes: Number(form.rent_duration_minutes),
    });
    setForm({ name: "", number: "", product_detail: "", rent_duration_minutes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-2"
          name="number"
          placeholder="Number"
          value={form.number}
          onChange={handleChange}
          required
        />
      </div>
      <textarea
        className="w-full rounded-xl border border-slate-200 px-4 py-2"
        name="product_detail"
        placeholder="Product detail"
        value={form.product_detail}
        onChange={handleChange}
        rows={3}
        required
      />
      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-2"
        name="rent_duration_minutes"
        placeholder="Rent time (minutes)"
        value={form.rent_duration_minutes}
        onChange={handleChange}
        type="number"
        min="1"
        required
      />
      <button className="w-full rounded-xl bg-ink px-4 py-2 text-white hover:bg-teal transition-colors">
        Add Rent
      </button>
    </form>
  );
}
