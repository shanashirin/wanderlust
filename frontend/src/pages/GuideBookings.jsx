import { useState } from "react";
import { Link } from "react-router-dom";

export default function GuideBookings() {
  // ✅ Current logged-in guide (dummy → replace with auth later)
  const currentGuide = { id: 101, name: "Guide A" };

  // ✅ Guide’s availability & booking status
  const [isAvailable, setIsAvailable] = useState(true);
  const [isBooked, setIsBooked] = useState(false);

  // ✅ Bookings from users (dummy → later fetch from API)
  const [bookings, setBookings] = useState([
    {
      id: 1,
      user: "Alice",
      destination: "Everest Base Camp",
      date: "2025-09-05",
      status: "pending",
      guideId: 101,
    },
    {
      id: 2,
      user: "Ravi",
      destination: "Pokhara City Tour",
      date: "2025-09-12",
      status: "pending",
      guideId: 101,
    },
    {
      id: 3,
      user: "Sophia",
      destination: "Annapurna Trek",
      date: "2025-09-20",
      status: "accepted",
      guideId: 101,
    },
  ]);

  // ✅ Only show this guide’s bookings
  const myBookings = bookings.filter(
    (booking) => booking.guideId === currentGuide.id
  );

  // ✅ Accept / Decline Booking
  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  // ✅ Toggle availability
  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  // ✅ Toggle manual booked status
  const toggleBooked = () => {
    setIsBooked(!isBooked);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Page Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">
            {currentGuide.name}'s Bookings
          </h1>
          <Link
            to="/guide-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Availability + Booked Status */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/80 rounded-xl shadow p-4">
          <p className="font-semibold text-gray-800">
            Availability:{" "}
            {isAvailable ? (
              <span className="text-green-600">✅ Available</span>
            ) : (
              <span className="text-red-600">❌ Not Available</span>
            )}
          </p>
          <div className="flex gap-4">
            <button
              onClick={toggleAvailability}
              className={`px-4 py-2 rounded-lg text-white shadow-md transition ${
                isAvailable
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isAvailable ? "Mark as Unavailable" : "Mark as Available"}
            </button>

            <button
              onClick={toggleBooked}
              className={`px-4 py-2 rounded-lg text-white shadow-md transition ${
                isBooked
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {isBooked ? "Booked" : "Not Booked"}
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {myBookings.length === 0 ? (
            <p className="text-gray-600 text-center">
              No booking requests yet.
            </p>
          ) : (
            myBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/95 rounded-xl shadow-lg p-6 flex justify-between items-center"
              >
                {/* Booking Info */}
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {booking.user}
                  </p>
                  <p className="text-gray-600">📍 {booking.destination}</p>
                  <p className="text-gray-500">📅 {booking.date}</p>
                  <p
                    className={`mt-1 font-medium ${
                      booking.status === "accepted"
                        ? "text-green-600"
                        : booking.status === "declined"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {booking.status}
                  </p>
                </div>

                {/* Action Buttons */}
                {booking.status === "pending" && isAvailable && !isBooked && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "accepted")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "declined")
                      }
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
