import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(() => JSON.parse(localStorage.getItem("userInfo")));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token) {
      toast.warning("Please login first!");
      navigate("/login");
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
  }, [user, navigate]);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading your bookings...</p>;

  return (
    <div className="min-h-screen bg-cover py-10 px-6 bg-center relative" style={{ backgroundImage: "url('../public/images/balloon.png')" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <Link
            to="/dashboard"
            className="text-teal-700 font-medium hover:text-teal-900 transition"
          >
            ← Back
          </Link>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">
            You have no bookings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
              >
                <div className="flex justify-between items-start flex-col md:flex-row md:items-center gap-4">
                  {/* Package Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {booking.packageId?.title || "Package"}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {booking.packageId?.destination || "Destination"} •{" "}
                      {booking.packageId?.duration || ""}
                    </p>
                    <span className="inline-block mt-2 bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                      ₹{booking.packageId?.price || "N/A"}
                    </span>
                  </div>
                  {console.log(booking)}
                  {/* Guide Info */}
                  <div className="text-right">
                    <h3 className="font-semibold text-gray-700">Guide</h3>
                    <p className="text-gray-600">{booking.guideId?.fullName || "Not assigned"}</p>
                    {/* <p className="text-sm text-gray-500">{booking.guideId?.isVerified || ""}</p> */}
                    {/* <p className="text-yellow-500 font-semibold text-sm">
                      ⭐ {booking.guideId?.rating || "N/A"}
                    </p> */}
                  </div>
                </div>

                {/* Status & Date */}
                <div className="flex justify-between items-center mt-4 flex-col md:flex-row">
                  <p
                    className={`font-semibold ${booking.status === "accepted"
                      ? "text-green-600"
                      : booking.status === "pending"
                        ? "text-yellow-600"
                        : booking.status === "declined"
                          ? "text-red-600"
                          : booking.status === "paid"
                            ? "text-teal-600"
                            : "text-gray-600"
                      }`}
                  >
                    Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </p>
                  <p className="text-gray-500 text-sm mt-1 md:mt-0">
                    Booked on: {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-4 flex  justify-between gap-3 flex-col w-full">
                  <button
                    disabled={booking.status === "paid"} // Only allow if accepted or paid
                    onClick={() => navigate(`/budget/${booking._id}`)}
                    className={`w-full md:w-auto px-6 py-2 font-semibold rounded-lg shadow transition 
    ${booking.status !== "paid"
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                  >
                    {booking.status === "paid" ? "Budget planned" : "Plan Budget"}
                  </button>
                  {booking.status === "paid" && (
                    <button
                      onClick={() => navigate(`/budget/${booking._id}`)}
                      className="w-full md:w-auto px-6 py-2 font-semibold rounded-lg shadow bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      View Budget
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}
