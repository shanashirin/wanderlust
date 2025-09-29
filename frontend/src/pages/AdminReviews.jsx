import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminReviews() {
  const [activeTab, setActiveTab] = useState("guide"); // guide, place, site
  const [guideReviews, setGuideReviews] = useState([]);
  const [placeReviews, setPlaceReviews] = useState([]);
  const [siteReviews, setSiteReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("userInfo"));
    if (!admin || !admin.token) {
      window.location.href = "/login";
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Fetch guide reviews
        const guideRes = await fetch("http://localhost:5000/api/reviews?type=guide", {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        const guideData = await guideRes.json();
        setGuideReviews(guideData);

        // Fetch place reviews
        const placeRes = await fetch("http://localhost:5000/api/reviews?type=place", {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        const placeData = await placeRes.json();
        setPlaceReviews(placeData);

        // Fetch site reviews
        const siteRes = await fetch("http://localhost:5000/api/reviews?type=site", {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        const siteData = await siteRes.json();
        setSiteReviews(siteData);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderReviews = (reviews) => {
    if (loading) return <p className="text-gray-700">Loading reviews...</p>;
    if (!reviews.length) return <p className="text-gray-700">No reviews yet.</p>;

    return (
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white/95 p-6 rounded-2xl shadow-md">
            {console.log(review)}
            <p className="font-semibold text-gray-800">
              {review.userId.fullName || review.user} -{" "}
              <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
            </p>
            <p className="text-gray-600 mt-2">{review.comment}</p>
            {review.guideId && <p className="text-gray-500 mt-1">Guide: {review.guideId.fullName}</p>}
            {review.place && <p className="text-gray-500 mt-1">Place: {review.place}</p>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#0D3B66]">Admin Reviews</h1>
          <Link
            to="/admin-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["guide", "place", "site"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab ? "bg-teal-600 text-white" : "bg-white text-teal-700"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Reviews
            </button>
          ))}
        </div>

        {/* Reviews Content */}
        <div>
          {activeTab === "guide" && renderReviews(guideReviews)}
          {activeTab === "place" && renderReviews(placeReviews)}
          {activeTab === "site" && renderReviews(siteReviews)}
        </div>
      </div>
    </div>
  );
}
