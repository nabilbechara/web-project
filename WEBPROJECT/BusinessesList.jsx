import { Link, useLocation } from "react-router-dom";
import { useData } from "./DataContext.jsx";
import { useMemo, useState } from "react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function BusinessesList() {
  const { businesses, categories } = useData();
  const qs = useQuery();

  const [term, setTerm] = useState(qs.get("q") || "");
  const [cat, setCat] = useState(qs.get("category") || "all");
  const [sort, setSort] = useState("rating");

  // Filter + sort businesses
  const filtered = businesses
    .filter(
      (b) =>
        (cat === "all" || b.category_id === cat) &&
        (term.trim() === "" ||
          [b.name, b.description, b.address]
            .join(" ")
            .toLowerCase()
            .includes(term.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "rating") return b.average_rating - a.average_rating;
      if (sort === "reviews") return b.review_count - a.review_count;
      return a.name.localeCompare(b.name);
    });

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Businesses</h1>

      {/* Filter Controls */}
      <div className="grid sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by name or address..."
          className="col-span-2 input"
        />

        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="input"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input"
        >
          <option value="rating">Sort: Rating</option>
          <option value="reviews">Sort: Reviews</option>
          <option value="name">Sort: A–Z</option>
        </select>
      </div>

      {/* Business Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <div
              key={b.id}
              className="card flex flex-col md:flex-row items-start md:items-center p-5 gap-4 hover:bg-gray-50"
            >
              <div className="flex-1">
                <Link
                  to={`/businesses/${b.id}`}
                  className="text-xl font-semibold hover:text-indigo-600 transition-colors"
                >
                  {b.name}
                </Link>
                <p className="text-sm text-gray-600">{b.address}</p>
                <div className="mt-1 text-sm text-yellow-500">
                  ⭐ {b.average_rating}{" "}
                  <span className="text-gray-600">
                    • {b.review_count} reviews
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-3 md:mt-0">
                <Link to={`/businesses/${b.id}`} className="btn-outline">
                  View
                </Link>
                <Link to={`/businesses/${b.id}/review`} className="btn-primary">
                  Review
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center py-10">
            No businesses found.
          </div>
        )}
      </div>
    </section>
  );
}
