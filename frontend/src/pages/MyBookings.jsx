import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("userInfo")));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.token) {
      toast.warning("Please login first!");
      window.location.href = "/login";
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookings/user/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]); // now user is a stable state value


  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;

  return (
    <div className="min-h-screen  py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <Link to="/dashboard" className="text-teal-700 hover:text-teal-900">← Back</Link>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">You have no bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow p-6">
                {/* Package Info */}
                <h2 className="text-xl font-bold text-gray-800">{booking.packageId?.title || "Package"}</h2>
                <p className="text-gray-600">{booking.packageId?.destination || "Destination"} • {booking.packageId?.duration || ""}</p>
                <p className="text-green-600 font-semibold mt-1">${booking.packageId?.price || "N/A"}</p>

                {/* Guide Info */}
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">Guide:</h3>
                  <p>{booking.guideId?.name || "Not assigned"}</p>
                  <p className="text-sm text-gray-600">{booking.guideId?.experience || ""}</p>
                  <p className="text-yellow-500 font-semibold text-sm">⭐ {booking.guideId?.rating || "N/A"}</p>
                </div>

                {/* Booking Status */}
                <p className={`mt-3 font-semibold ${booking.status === "accepted" ? "text-green-600" :
                  booking.status === "pending" ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                  Status: {booking.status}
                </p>

                {/* Booking Date */}
                <p className="text-gray-500 text-sm mt-1">Booked on: {new Date(booking.date).toLocaleDateString()}</p>

                {/* {booking.status === "accepted" && ( */}
                  <button
                    onClick={() => navigate(`/budget/${booking._id}`)}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Plan Budget
                  </button>
                {/* )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
