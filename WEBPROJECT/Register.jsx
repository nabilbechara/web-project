import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function Register() {
  const { register } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password)
      return setError("All fields are required.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    try {
      const user = register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate(`/users/${user.id}/reviews`);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <section className="max-w-sm">
      <h1 className="text-2xl font-bold mb-3">Create Account</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl border"
      >
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white w-full">
          Register
        </button>
      </form>
    </section>
  );
}
