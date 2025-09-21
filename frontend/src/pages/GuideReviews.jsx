import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GuideReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in guide info
  const guide = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const guide = JSON.parse(localStorage.getItem("userInfo"));
    if (!guide || !guide.token) {
      window.location.href = "/login";
      return;
    }
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reviews/guides/${guide._id}`,
          {
            headers: { Authorization: `Bearer ${guide.token}` },
          }
        );
        const data = await res.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#0D3B66]">Guide Reviews</h1>
          <Link
            to="/guide-profile"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Profile
          </Link>
        </div>

        {/* Loading */}
        {loading && <p className="text-gray-700">Loading reviews...</p>}

        {/* Reviews List */}
        {!loading && reviews.length === 0 && (
          <p className="text-gray-700">No reviews yet.</p>
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white/95 p-6 rounded-2xl shadow-md"
              >
                <p className="font-semibold text-gray-800">
                  {review.userName || review.user} -{" "}
                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </p>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
