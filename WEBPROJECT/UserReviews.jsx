import { useParams, Link } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function UserReviews() {
  const { id } = useParams();
  const { users, getUserReviews, businesses } = useData();
  const user = users.find((u) => u.id === id);
  const reviews = getUserReviews(id).map((r) => ({
    ...r,
    business: businesses.find((b) => b.id === r.business_id),
  }));

  if (!user) return <div>User not found.</div>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Reviews by {user.username}</h1>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="border rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between">
              <Link
                to={`/businesses/${r.business_id}`}
                className="font-medium hover:underline"
              >
                {r.business?.name ?? "Business"}
              </Link>
              <div>⭐ {r.rating}</div>
            </div>
            <p className="mt-1">{r.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-gray-600">No reviews yet.</div>
        )}
      </div>
    </section>
  );
}
