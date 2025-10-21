import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function BusinessForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, rawBusinesses, addBusiness, updateBusiness } = useData();

  const existing = rawBusinesses.find((b) => b.id === id);
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    website: "",
    category_id: categories[0]?.id || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && existing) setForm(existing);
  }, [isEdit, existing]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.address) {
      setError("Name and address are required.");
      return;
    }
    if (isEdit && existing) {
      updateBusiness(existing.id, form);
      navigate(`/businesses/${existing.id}`);
    } else {
      const newId = addBusiness(form);
      navigate(`/businesses/${newId}`);
    }
  };

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Business" : "Add Business"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl border"
      >
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            rows={3}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Address *</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">
          {isEdit ? "Save Changes" : "Create Business"}
        </button>
      </form>
    </section>
  );
}
