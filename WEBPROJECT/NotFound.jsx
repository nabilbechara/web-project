import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="text-center py-20">
      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="text-gray-700 mb-4">This page could not be found.</p>
      <Link to="/" className="text-indigo-600">
        Go home
      </Link>
    </section>
  );
}
