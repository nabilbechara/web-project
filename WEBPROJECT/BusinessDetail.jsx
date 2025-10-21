import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { businesses, reviews, users, currentUser } = useData();

  const business = businesses.find((b) => b.id === id);
  const bizReviews = reviews
    .filter((r) => r.business_id === id)
    .map((r) => ({
      ...r,
      user: users.find((u) => u.id === r.user_id),
    }))
    .sort((a, b) => b.id.localeCompare(a.id));

  if (!business)
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center text-gray-600">
        Business not found.
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Business Header */}
      <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
          <p className="text-gray-600 text-sm mt-1">{business.address}</p>

          <div className="mt-2 text-sm text-gray-700 flex flex-col sm:flex-row gap-2 sm:items-center">
            <span>
              📞 <span className="font-medium">{business.phone || "N/A"}</span>
            </span>
            {business.website && (
              <span>
                🌐{" "}
                <a
                  href={business.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Visit Website
                </a>
              </span>
            )}
          </div>

          <div className="mt-3 text-yellow-500 text-sm font-medium">
            ⭐ {business.average_rating}{" "}
            <span className="text-gray-600 font-normal">
              • {bizReviews.length} reviews
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/businesses/${business.id}/review`}
            className="btn-primary text-center"
          >
            Write a Review
          </Link>
          {currentUser && (
            <button
              onClick={() => navigate(`/businesses/${business.id}/edit`)}
              className="btn-outline"
            >
              Edit Business
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      {business.description && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">
            About this business
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {business.description}
          </p>
        </div>
      )}

      {/* Reviews Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>

        {bizReviews.length > 0 ? (
          <div className="space-y-4">
            {bizReviews.map((r) => (
              <div
                key={r.id}
                className="card p-5 border border-gray-100 hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">
                      {r.user?.username ?? "Anonymous"}
                    </div>
                    <div className="text-sm text-gray-500">
                      ⭐ {r.rating} / 5
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm text-gray-600">
            No reviews yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </section>
  );
}
