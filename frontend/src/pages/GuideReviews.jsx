import { Link } from "react-router-dom";

export default function GuideReviews() {
  // Dummy reviews – later fetch from backend
  const reviews = [
    {
      user: "Alice",
      rating: 5,
      comment: "Amazing experience! Highly recommend.",
    },
    {
      user: "Ravi",
      rating: 4,
      comment: "Very friendly and knowledgeable guide.",
    },
    {
      user: "Sophia",
      rating: 5,
      comment: "Made our trip unforgettable!",
    },
  ];

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

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/95 p-6 rounded-2xl shadow-md"
            >
              <p className="font-semibold text-gray-800">
                {review.user} -{" "}
                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>
              </p>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
