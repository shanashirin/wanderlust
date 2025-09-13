import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"; // ⭐ star icon

export default function GuideReviews() {
  // ✅ Current logged-in guide (dummy for now → replace with auth later)
  const currentGuide = { id: 101, name: "Guide A" };

  // ✅ Dummy reviews (later fetch from API)
  const [reviews] = useState([
    {
      id: 1,
      user: "Alice",
      guideId: 101,
      rating: 5,
      comment: "Amazing experience! Very knowledgeable and friendly.",
      date: "2025-09-10",
    },
    {
      id: 2,
      user: "Ravi",
      guideId: 101,
      rating: 4,
      comment: "Great guide, but the trek was a bit rushed.",
      date: "2025-09-15",
    },
    {
      id: 3,
      user: "Sophia",
      guideId: 102, // belongs to another guide
      rating: 5,
      comment: "Outstanding service!",
      date: "2025-09-18",
    },
  ]);

  // ✅ Filter only this guide’s reviews
  const myReviews = reviews.filter(
    (review) => review.guideId === currentGuide.id
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">
            Reviews for {currentGuide.name}
          </h1>
          <Link
            to="/guide-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {myReviews.length === 0 ? (
            <p className="text-gray-600 text-center">
              No reviews yet. 🚫
            </p>
          ) : (
            myReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/95 rounded-xl shadow-lg p-6"
              >
                {/* Reviewer Info */}
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-lg text-gray-800">
                    {review.user}
                  </p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>

                {/* Rating Stars */}
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 italic">"{review.comment}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
