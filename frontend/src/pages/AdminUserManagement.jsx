import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminUserManagement() {
  // ✅ Users with verification status
  const [users, setUsers] = useState([
    { id: 201, name: "Alice", verified: true },
    { id: 202, name: "Ravi", verified: false },
    { id: 203, name: "Sophia", verified: true },
  ]);

  const [bookings] = useState([
    { id: 1, userId: 201, guide: "Guide A", destination: "Everest Base Camp", date: "2025-09-05", status: "accepted" },
    { id: 2, userId: 202, guide: "Guide B", destination: "Pokhara City Tour", date: "2025-09-12", status: "pending" },
    { id: 3, userId: 203, guide: "Guide C", destination: "Annapurna Trek", date: "2025-09-20", status: "declined" },
  ]);

  const [payments] = useState([
    { id: 1, userId: 201, guide: "Guide A", amount: 25000, status: "paid" },
    { id: 2, userId: 202, guide: "Guide B", amount: 5000, status: "pending" },
    { id: 3, userId: 203, guide: "Guide C", amount: 18000, status: "paid" },
  ]);

  const [reviews] = useState([
    { id: 1, userId: 201, guide: "Guide A", rating: 5, comment: "Amazing experience!" },
    { id: 2, userId: 202, guide: "Guide B", rating: 2, comment: "Guide was not helpful." },
    { id: 3, userId: 203, guide: "Guide C", rating: 4, comment: "Very good trek." },
  ]);

  // ✅ Remove user function
  const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // ✅ Calculate average rating given by a user
  const getAverageRatingByUser = (userId) => {
    const userReviews = reviews.filter((r) => r.userId === userId);
    if (userReviews.length === 0) return 0;
    const total = userReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / userReviews.length).toFixed(1);
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
          <h1 className="text-3xl font-bold text-[#0D3B66]">Admin – Manage Users</h1>
          <Link
            to="/admin-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* User Management */}
        <div className="space-y-10">
          {users.map((user) => {
            const avgRating = getAverageRatingByUser(user.id);

            return (
              <div
                key={user.id}
                className="bg-white/95 rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.name}
                    {!user.verified && (
                      <span className="ml-2 text-sm text-red-600">(Not Verified)</span>
                    )}
                  </h2>
                  <span className="text-gray-600 font-medium">
                    ⭐ Avg Rating: {avgRating}
                  </span>
                </div>

                {/* ✅ Remove User Button */}
                {(!user.verified || avgRating < 3) && (
                  <button
                    onClick={() => removeUser(user.id)}
                    className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove User
                  </button>
                )}

                {/* Bookings Section */}
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Bookings</h3>
                <div className="space-y-3 mb-6">
                  {bookings.filter(b => b.userId === user.id).map((b) => (
                    <div key={b.id} className="bg-gray-100 p-3 rounded-md">
                      <p><span className="font-bold">Guide:</span> {b.guide} → {b.destination} ({b.date})</p>
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
                  {payments.filter(p => p.userId === user.id).map((p) => (
                    <div key={p.id} className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span>Guide: {p.guide} – ₹{p.amount}</span>
                      <span className={p.status === "paid" ? "text-green-600" : "text-yellow-600"}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Reviews Section */}
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Reviews by User</h3>
                <div className="space-y-3">
                  {reviews.filter(r => r.userId === user.id).map((r) => (
                    <div key={r.id} className="bg-gray-100 p-3 rounded-md">
                      <p><span className="font-bold">Guide:</span> {r.guide} ⭐ {r.rating}/5</p>
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
