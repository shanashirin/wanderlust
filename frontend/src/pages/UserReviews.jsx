import React, { useState } from "react";

export default function UserReviews() {
  const [formData, setFormData] = useState({
    guideReview: "",
    placeReview: "",
    siteReview: "",
    rating: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Review Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Review Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
          Share Your Experience
        </h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-teal-700">
              🎉 Thank you for your feedback!
            </h3>
            <p className="text-gray-600 mt-2">
              Your review has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guide Review */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Review Your Guide
              </label>
              <textarea
                name="guideReview"
                value={formData.guideReview}
                onChange={handleChange}
                placeholder="How was your guide?"
                className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="3"
              />
            </div>

            {/* Place Review */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Review the Places You Visited
              </label>
              <textarea
                name="placeReview"
                value={formData.placeReview}
                onChange={handleChange}
                placeholder="What did you like about the destinations?"
                className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="3"
              />
            </div>

            {/* Site Review */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Review Our Website
              </label>
              <textarea
                name="siteReview"
                value={formData.siteReview}
                onChange={handleChange}
                placeholder="Was this site helpful for planning your trip?"
                className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="3"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Overall Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      formData.rating >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
