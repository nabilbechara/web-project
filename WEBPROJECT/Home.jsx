import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function Home() {
  const { businesses, categories } = useData();

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
  }, []);

  const top = [...businesses]
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center fade-in">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Discover the Best Local Businesses
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Read trusted reviews, share your experience, and explore top-rated
          spots near you.
        </p>
        <Link to="/businesses" className="btn-primary inline-block">
          Explore Now
        </Link>
      </section>

      <section className="fade-in">
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/businesses?category=${encodeURIComponent(c.id)}`}
              className="card p-6 hover:-translate-y-1"
            >
              <div className="text-lg font-semibold text-gray-800">
                {c.name}
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Explore {c.name} in your area
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="fade-in">
        <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {top.map((b) => (
            <Link
              key={b.id}
              to={`/businesses/${b.id}`}
              className="card hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{b.name}</h3>
                <p className="text-sm text-gray-500">{b.address}</p>
                <div className="mt-2 text-sm text-yellow-500">
                  ⭐ {b.average_rating}{" "}
                  <span className="text-gray-600">
                    • {b.review_count} reviews
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
