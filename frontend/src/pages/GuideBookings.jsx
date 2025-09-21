import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function GuideBookings() {
  const guide = JSON.parse(localStorage.getItem("userInfo")); // logged-in guide
  const [bookings, setBookings] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // ✅ Fetch guide's bookings
  useEffect(() => {
    const guide = JSON.parse(localStorage.getItem("userInfo")); // logged-in guide

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookings/guide/${guide._id}`, {
          headers: { Authorization: `Bearer ${guide.token}` },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch guide bookings:", err);
        toast.error("Failed to load bookings");
      }
    };
    fetchBookings();
  }, []);

  // ✅ Update booking status
  const updateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${guide.token}`,
        },
        body: JSON.stringify({ status }),
      });

      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      toast.success(`Booking ${status}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update booking");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('../public/images/balloon.png')" }}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">{guide.fullName}'s Bookings</h1>
          <Link to="/guide-dashboard" className="text-teal-700 font-medium hover:text-[#E67E22] transition">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Availability toggle */}
        <div className="mb-8 flex items-center justify-between bg-white/80 rounded-xl shadow p-4">
          <p className="font-semibold text-gray-800">
            Availability: {isAvailable ? <span className="text-green-600">✅ Available</span> : <span className="text-red-600">❌ Not Available</span>}
          </p>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-2 rounded-lg text-white shadow-md transition ${isAvailable ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {isAvailable ? "Mark as Unavailable" : "Mark as Available"}
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <p className="text-gray-600 text-center">No booking requests yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white/95 rounded-xl shadow-lg p-6 flex justify-between items-center">
                {/* Info */}
                <div>
                  <p className="font-bold text-lg text-gray-800">{booking.userId?.fullName}</p>
                  <p className="text-gray-600">📍 {booking.packageId?.destination}</p>
                  <p className="text-gray-500">📅 {new Date(booking.date).toLocaleDateString()}</p>
                  <p
                    className={`mt-1 font-medium ${booking.status === "accepted"
                      ? "text-green-600"
                      : booking.status === "declined"
                        ? "text-red-600"
                        : "text-yellow-600"
                      }`}
                  >
                    Status: {booking.status}
                  </p>
                </div>

                {/* Actions */}
                {booking.status === "pending" && isAvailable && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateBookingStatus(booking._id, "accepted")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking._id, "declined")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
