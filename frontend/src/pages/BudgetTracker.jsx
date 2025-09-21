
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function BudgetTracker() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [user] = useState(() => JSON.parse(localStorage.getItem("userInfo")));
  if (!user || !user.token) {
    navigate("/login");
  }
  if (!bookingId) {
    toast.warning("please select a booking first!");
    navigate("/bookings");
  }
  const [booking, setBooking] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch booking & package details
  useEffect(() => {
    if (!user?.token) {
      toast.warning("Please login first!");
      navigate("/login");
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) throw new Error("Booking not found");
        const data = await res.json();
        setBooking(data);
        setDestinations(data.packageId?.destinations || []);
      } catch (err) {
        console.error(err);
        toast.error("Cannot load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, user, navigate]);

  if (loading) return <p className="text-center mt-10">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10">Booking not found</p>;

  const allActivities = destinations.flatMap(d => d.activities || []);
  const total = selected.reduce((sum, id) => {
    const act = allActivities.find(a => a._id === id || a.id === id);
    return sum + (act?.price || 0);
  }, 0);

  const handleCheckbox = id =>
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));


  const handlePayNow = async () => {
    if (!user || !user.token) return toast.error("Login first");

    try {
      const payload = {
        packageId: booking.packageId._id,
        amount: total,
        selectedActivities: destinations.flatMap(d =>
          d.activities.filter(a => selected.includes(a.id))
        ),
      };

      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Payment failed");
      const data = await res.json();

      toast.success("Payment Successful!");
      setPaid(true);
      console.log("Payment stored:", data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed");
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <button
          onClick={() => navigate("/bookings")}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Bookings
        </button>

        {!confirmed ? (
          <>
            <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">Travel Budget Planner</h2>

            <div className="space-y-8">
              {destinations.map(dest => (
                <div key={dest._id || dest.id} className="bg-gray-100 p-6 rounded-xl shadow">
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">{dest.name}</h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>

                  <div className="space-y-3">
                    {(dest.activities || []).map(act => (
                      <label
                        key={act._id || act.id}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selected.includes(act._id || act.id)}
                            onChange={() => handleCheckbox(act._id || act.id)}
                            className="w-5 h-5 text-teal-600"
                          />
                          <span className="font-medium">{act.name}</span>
                        </div>
                        <span className="text-teal-700 font-semibold">₹{act.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-[#0D3B66]">Total: ₹{total}</h3>
              <button
                className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
                disabled={selected.length === 0}
                onClick={() => setConfirmed(true)}
              >
                Confirm Selection
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">Your Itinerary & Budget</h2>

            {destinations.map(dest => {
              const chosen = (dest.activities || []).filter(a => selected.includes(a._id || a.id));
              if (!chosen.length) return null;
              return (
                <div key={dest._id || dest.id} className="bg-gray-100 p-6 rounded-xl shadow mb-6">
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">{dest.name}</h3>
                  <ul className="space-y-2">
                    {chosen.map(a => (
                      <li key={a._id || a.id} className="flex justify-between text-gray-700">
                        <span>{a.name}</span>
                        <span className="font-semibold text-teal-700">₹{a.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-[#0D3B66]">Total Budget: ₹{total}</h3>
              {!paid ? (
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                  onClick={handlePayNow}
                >
                  Pay Now
                </button>
              ) : (
                <p className="mt-4 text-green-700 font-bold text-lg">✅ Payment Successful!</p>
              )}

              <button
                className="mt-4 ml-3 px-6 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
                onClick={() => setConfirmed(false)}
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
