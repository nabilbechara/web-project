import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function Login() {
  const { login } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password)
      return setError("Email/Username and password are required.");
    try {
      const user = login({ email, password });
      navigate(`/users/${user.id}/reviews`);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <section className="max-w-sm">
      <h1 className="text-2xl font-bold mb-3">Log in</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl border"
      >
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Email or Username</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white w-full">
          Log in
        </button>
      </form>
      <p className="text-sm text-gray-700 mt-3">
        No account?{" "}
        <Link to="/register" className="text-indigo-600">
          Register
        </Link>
      </p>
    </section>
  );
}
