import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminGuideManagement() {
  // ✅ Guides with verification status
  const [guides, setGuides] = useState([
    { id: 101, name: "Guide A", verified: true },
    { id: 102, name: "Guide B", verified: false },
    { id: 103, name: "Guide C", verified: true },
  ]);

  const [bookings] = useState([
    { id: 1, user: "Alice", guideId: 101, destination: "Everest Base Camp", date: "2025-09-05", status: "accepted" },
    { id: 2, user: "Ravi", guideId: 101, destination: "Pokhara City Tour", date: "2025-09-12", status: "pending" },
    { id: 3, user: "Sophia", guideId: 102, destination: "Annapurna Trek", date: "2025-09-20", status: "declined" },
  ]);

  const [payments] = useState([
    { id: 1, guideId: 101, user: "Alice", amount: 25000, status: "paid" },
    { id: 2, guideId: 101, user: "Ravi", amount: 5000, status: "pending" },
    { id: 3, guideId: 102, user: "Sophia", amount: 18000, status: "paid" },
  ]);

  const [reviews] = useState([
    { id: 1, guideId: 101, user: "Alice", rating: 5, comment: "Amazing experience!" },
    { id: 2, guideId: 101, user: "Ravi", rating: 4, comment: "Great guide but trek was rushed." },
    { id: 3, guideId: 102, user: "Sophia", rating: 2, comment: "Not professional." },
    { id: 4, guideId: 103, user: "Daniel", rating: 5, comment: "Best guide ever!" },
  ]);

  // ✅ Function to remove guide
  const removeGuide = (id) => {
    setGuides((prev) => prev.filter((g) => g.id !== id));
  };

  // ✅ Calculate average rating for a guide
  const getAverageRating = (guideId) => {
    const guideReviews = reviews.filter((r) => r.guideId === guideId);
    if (guideReviews.length === 0) return 0;
    const total = guideReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / guideReviews.length).toFixed(1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">Admin – Manage Guides</h1>
          <Link
            to="/admin-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Guide Management */}
        <div className="space-y-10">
          {guides.map((guide) => {
            const avgRating = getAverageRating(guide.id);

            return (
              <div
                key={guide.id}
                className="bg-white/95 rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {guide.name} 
                    {!guide.verified && (
                      <span className="ml-2 text-sm text-red-600">(Not Verified)</span>
                    )}
                  </h2>
                  <span className="text-gray-600 font-medium">
                    ⭐ Avg Rating: {avgRating}
                  </span>
                </div>

                {/* ✅ Remove Guide Button */}
                {(!guide.verified || avgRating < 3) && (
                  <button
                    onClick={() => removeGuide(guide.id)}
                    className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove Guide
                  </button>
                )}

                {/* Bookings Section */}
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Bookings</h3>
                <div className="space-y-3 mb-6">
                  {bookings.filter(b => b.guideId === guide.id).map((b) => (
                    <div key={b.id} className="bg-gray-100 p-3 rounded-md">
                      <p><span className="font-bold">{b.user}</span> → {b.destination} ({b.date})</p>
                      <p className={`text-sm ${
                        b.status === "accepted"
                          ? "text-green-600"
                          : b.status === "declined"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}>
                        Status: {b.status}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Payments Section */}
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Payments</h3>
                <div className="space-y-3 mb-6">
                  {payments.filter(p => p.guideId === guide.id).map((p) => (
                    <div key={p.id} className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span>User: {p.user} – ₹{p.amount}</span>
                      <span className={p.status === "paid" ? "text-green-600" : "text-yellow-600"}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Reviews Section */}
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Reviews</h3>
                <div className="space-y-3">
                  {reviews.filter(r => r.guideId === guide.id).map((r) => (
                    <div key={r.id} className="bg-gray-100 p-3 rounded-md">
                      <p><span className="font-bold">{r.user}</span> ⭐ {r.rating}/5</p>
                      <p className="text-gray-700 italic">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
