import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "./DataContext.jsx";

export default function WriteReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { businesses, addReview } = useData();
  const business = businesses.find((b) => b.id === id);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!business) return <div>Business not found.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (rating < 1 || rating > 5)
      return setError("Rating must be between 1–5.");
    if (comment.trim().length < 5)
      return setError("Please enter at least 5 characters.");

    try {
      addReview({ business_id: id, rating, comment });
      navigate(`/businesses/${id}`);
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    }
  };

  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Write a Review</h1>
      <div className="text-gray-700 mb-4">
        for <span className="font-semibold">{business.name}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl border"
      >
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Rating (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-24 border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            rows={4}
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">
          Submit Review
        </button>
      </form>
    </section>
  );
}
