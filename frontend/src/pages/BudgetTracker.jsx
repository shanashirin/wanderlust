import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BudgetTracker() {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: "Manali, Himachal Pradesh",
      description:
        "A beautiful hill station in the Himalayas, known for snow-capped mountains, adventure sports, and scenic valleys.",
      activities: [
        { id: 101, name: "Solang Valley Trek", price: 2500 },
        { id: 102, name: "Paragliding", price: 3000 },
        { id: 103, name: "Hadimba Temple Visit", price: 800 },
        { id: 104, name: "Hot Springs Bath", price: 500 },
      ],
    },
    {
      id: 2,
      name: "Goa",
      description:
        "A coastal paradise famous for its beaches, nightlife, Portuguese heritage, and water sports.",
      activities: [
        { id: 201, name: "Scuba Diving", price: 1800 },
        { id: 202, name: "Beach Party", price: 1200 },
        { id: 203, name: "Old Goa Churches Tour", price: 900 },
        { id: 204, name: "Dudhsagar Waterfalls Trek", price: 1500 },
      ],
    },
    {
      id: 3,
      name: "Jaipur, Rajasthan",
      description:
        "The Pink City of India, known for its palaces, forts, royal heritage, and vibrant markets.",
      activities: [
        { id: 301, name: "Amber Fort Tour", price: 1000 },
        { id: 302, name: "City Palace Visit", price: 1200 },
        { id: 303, name: "Elephant Ride", price: 2000 },
        { id: 304, name: "Local Bazaar Shopping", price: 700 },
      ],
    },
  ];

  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const allActivities = destinations.flatMap((d) => d.activities);

  const total = selected.reduce((sum, id) => {
    const activity = allActivities.find((a) => a.id === id);
    return sum + (activity ? activity.price : 0);
  }, 0);

  const handleCheckbox = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => setConfirmed(true);
  const handleBack = () => setConfirmed(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        {/* 🔙 Back to Bookings Button */}
        <button
          onClick={() => navigate("/bookings")} // ✅ now goes to bookings page
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Bookings
        </button>

        {!confirmed ? (
          <>
            <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
              Travel Budget Planner
            </h2>

            <div className="space-y-8">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="bg-gray-100 p-6 rounded-xl shadow"
                >
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>

                  <div className="space-y-3">
                    {destination.activities.map((activity) => (
                      <label
                        key={activity.id}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selected.includes(activity.id)}
                            onChange={() => handleCheckbox(activity.id)}
                            className="w-5 h-5 text-teal-600"
                          />
                          <span className="font-medium">{activity.name}</span>
                        </div>
                        <span className="text-teal-700 font-semibold">
                          ₹{activity.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total + Confirm */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-[#0D3B66]">
                Total: ₹{total}
              </h3>
              <button
                className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
                disabled={selected.length === 0}
                onClick={handleConfirm}
              >
                Confirm Selection
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Summary Page */}
            <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
              Your Itinerary & Budget
            </h2>

            {destinations.map((destination) => {
              const chosenActivities = destination.activities.filter((a) =>
                selected.includes(a.id)
              );
              if (chosenActivities.length === 0) return null;
              return (
                <div
                  key={destination.id}
                  className="bg-gray-100 p-6 rounded-xl shadow mb-6"
                >
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                    {destination.name}
                  </h3>
                  <ul className="space-y-2">
                    {chosenActivities.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex justify-between text-gray-700"
                      >
                        <span>{activity.name}</span>
                        <span className="font-semibold text-teal-700">
                          ₹{activity.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-[#0D3B66]">
                Total Budget: ₹{total}
              </h3>
              <button
                className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
                onClick={handleBack}
              >
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
