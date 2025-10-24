import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <section className="min-h-[90vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md p-[2px] rounded-3xl bg-gradient-border shadow-2xl"
      >
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <div className="text-red-600 bg-red-100 border border-red-200 px-3 py-2 rounded-lg text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "username", label: "Username", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
              {
                name: "confirm",
                label: "Confirm Password",
                type: "password",
              },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/60 backdrop-blur-sm border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              Register
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
