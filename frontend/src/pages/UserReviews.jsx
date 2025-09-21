import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function UserReviews() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [formData, setFormData] = useState({
    reviewType: "guide", // default type
    selectedGuideId: "",
    selectedPlace: "",
    comment: "",
    rating: 0,
  });

  const [guides, setGuides] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user || !user.token) window.location.href = "/login";
  }, [user]);

  // Fetch guides from backend
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/guides", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setGuides(data);
      } catch (err) {
        console.error("❌ Failed to fetch guides:", err);
      }
    };
    fetchGuides();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to submit a review");

    // Construct payload
    const payload = {
      type: formData.reviewType,
      userId: user._id,
      comment: formData.comment,
      rating: formData.rating,
    };

    if (formData.reviewType === "guide") payload.guideId = formData.selectedGuideId;
    if (formData.reviewType === "place") payload.place = formData.selectedPlace;

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

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
            {/* Review Type Selector */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Review Type
              </label>
              <select
                name="reviewType"
                value={formData.reviewType}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border"
              >
                <option value="guide">Guide</option>
                <option value="place">Place</option>
                <option value="site">Website</option>
              </select>
            </div>

            {/* Conditional Guide Selector */}
            {formData.reviewType === "guide" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Guide</label>
                <Select
                  options={guides.map((g) => ({ value: g._id, label: g.fullName }))}
                  onChange={(selected) =>
                    setFormData((prev) => ({ ...prev, selectedGuideId: selected.value }))
                  }
                  placeholder="Select a guide..."
                  isSearchable
                />
              </div>
            )}

            {/* Conditional Place Input */}
            {formData.reviewType === "place" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Place Name</label>
                <input
                  type="text"
                  name="selectedPlace"
                  value={formData.selectedPlace}
                  onChange={handleChange}
                  placeholder="Enter place name"
                  className="w-full p-2 rounded-lg border"
                />
              </div>
            )}

            {/* Comment */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Review</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Write your review..."
                className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="4"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${formData.rating >= star ? "text-yellow-500" : "text-gray-400"
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
