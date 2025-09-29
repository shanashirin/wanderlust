import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, History } from "lucide-react";
import { toast } from "react-toastify";

export default function BudgetTracker() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [user] = useState(() => JSON.parse(localStorage.getItem("userInfo")));

  // Redirect if not logged in
  if (!user || !user.token) {
    navigate("/login");
  }

  useEffect(() => {
    if (!bookingId) {
      toast.warning("please select a booking first!");
      navigate("/bookings");
    }
  }, [bookingId, navigate]);

  const [booking, setBooking] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [fetchingPayment, setFetchingPayment] = useState(false);

  // Fetch booking
  useEffect(() => {
    if (!user?.token) {
      toast.warning("Please login first!");
      navigate("/login");
      return;
    }

    const fetchBooking = async () => {
      try {
        if (!bookingId) return;
        const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) throw new Error("Booking not found");
        const data = await res.json();
        setBooking(data);
        setDestinations(data.packageId?.destinations || []);

        // Check if booking is already paid
        if (data.status === 'paid') {
          setPaid(true);
          setConfirmed(true);
          // If there are selected activities in booking data, use them
          if (data.selectedActivities && data.selectedActivities.length > 0) {
            const activityIds = data.selectedActivities.map(act => act._id || act.id);
            setSelected(activityIds);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Cannot load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, user, navigate]);

  // Fetch payment history
  const fetchPaymentHistory = async () => {
    if (!user?.token || !bookingId) return;

    setFetchingPayment(true);
    try {
      const res = await fetch(`http://localhost:5000/api/payments/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setPaymentHistory(data);
        toast.success("Payment history loaded!");
      } else if (res.status === 404) {
        toast.info("No payment history found for this booking");
      } else {
        throw new Error("Failed to fetch payment history");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Cannot load payment history");
    } finally {
      setFetchingPayment(false);
    }
  };

  // Auto-fetch payment history if booking is paid
  useEffect(() => {
    if (paid && bookingId && user?.token) {
      fetchPaymentHistory();
    }
  }, [paid, bookingId, user]);

  if (loading) return <p className="text-center mt-10">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10">Booking not found</p>;

  const pkg = booking.packageId;
  const allActivities = destinations.flatMap((d) => d.activities || []);

  // Include base package price + selected activities
  const activitiesTotal = selected.reduce((sum, id) => {
    const act = allActivities.find((a) => a._id === id || a.id === id);
    return sum + (act?.price || 0);
  }, 0);
  const total = pkg.price + activitiesTotal;

  const handleCheckbox = (id) => {
    // Don't allow changes if already paid
    if (paid) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handlePayNow = async () => {
    if (!user || !user.token) return toast.error("Login first");
    try {
      const payload = {
        packageId: booking.packageId._id,
        bookingId: booking._id,
        guideId: booking.guideId,
        amount: total,
        selectedActivities: destinations.flatMap((d) =>
          d.activities.filter((a) => selected.includes(a._id || a.id))
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

      // Fetch payment history after successful payment
      fetchPaymentHistory();

      console.log("Payment stored:", data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed");
    }
  };

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  // If booking is already paid, show everything directly
  if (paid) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative p-6"
        style={{
          backgroundImage: "url('../public/images/balloon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>
        <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-5xl">
          <button
            onClick={() => navigate("/bookings")}
            className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Bookings
          </button>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#0D3B66]">
              Booking Details (Already Paid)
            </h2>
            <button
              onClick={fetchPaymentHistory}
              disabled={fetchingPayment}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <History className="w-4 h-4" />
              {fetchingPayment ? "Loading..." : "Refresh Payment"}
            </button>
          </div>

          {/* Payment History Section */}
          {paymentHistory && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Payment Receipt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Payment ID:</strong> {paymentHistory._id}</p>
                  <p><strong>Amount Paid:</strong> ₹{paymentHistory.amount}</p>
                  <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{paymentHistory.status}</span></p>
                </div>
                <div>
                  <p><strong>Payment Date:</strong> {new Date(paymentHistory.createdAt).toLocaleDateString()}</p>
                  <p><strong>Package:</strong> {paymentHistory.package?.title}</p>
                  <p><strong>Booking ID:</strong> {paymentHistory.bookingId}</p>
                </div>
              </div>
            </div>
          )}

          {/* Package Info */}
          <div className="bg-gray-100 p-6 rounded-xl shadow mb-8">
            <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
              {pkg.title}
            </h3>
            <p className="text-gray-700 mb-2">{pkg.description}</p>
            <p className="font-semibold text-teal-700">
              Base Package Price: ₹{pkg.price}
            </p>
          </div>

          {/* Itinerary */}
          <div className="bg-gray-100 p-6 rounded-xl shadow mb-6">
            <h3 className="text-xl font-bold text-[#0D3B66] mb-4">
              Trip Itinerary
            </h3>
            <ul className="space-y-2">
              {pkg.itinerary.map((day) => (
                <li
                  key={day._id}
                  className="p-3 bg-white rounded-lg shadow text-gray-700"
                >
                  <strong>Day {day.day}: </strong> {day.details}
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Activities */}
          <div className="space-y-8">
            {destinations.map((dest) => {
              const chosen = (dest.activities || []).filter((a) =>
                selected.includes(a._id || a.id)
              );
              return (
                <div
                  key={dest._id || dest.id}
                  className="bg-gray-100 p-6 rounded-xl shadow"
                >
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>

                  <div className="space-y-3">
                    {chosen.length > 0 ? (
                      chosen.map((act) => (
                        <div
                          key={act._id || act.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center text-green-600">
                              ✓
                            </div>
                            <span className="font-medium">{act.name}</span>
                          </div>
                          <span className="text-teal-700 font-semibold">
                            ₹{act.price}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No activities selected for this destination
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold text-[#0D3B66]">
              Total Paid: ₹{total}
            </h3>
            <p className="text-green-600 font-semibold mt-2">✅ Payment Completed</p>
            <button
              className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
              onClick={handleNavigate}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original flow for non-paid bookings
  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-6"
      style={{
        backgroundImage: "url('../public/images/balloon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>
      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-5xl">
        <button
          onClick={() => navigate("/bookings")}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Bookings
        </button>

        {!confirmed ? (
          <>
            <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
              Travel Budget Planner
            </h2>

            {/* Package Info */}
            <div className="bg-gray-100 p-6 rounded-xl shadow mb-8">
              <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                {pkg.title}
              </h3>
              <p className="text-gray-700 mb-2">{pkg.description}</p>
              <p className="font-semibold text-teal-700">
                Base Package Price: ₹{pkg.price}
              </p>
            </div>

            {/* Activities */}
            <div className="space-y-8">
              {destinations.map((dest) => (
                <div
                  key={dest._id || dest.id}
                  className="bg-gray-100 p-6 rounded-xl shadow"
                >
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>

                  <div className="space-y-3">
                    {(dest.activities || []).map((act) => (
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
                        <span className="text-teal-700 font-semibold">
                          ₹{act.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-[#0D3B66]">
                Total (Package + Activities): ₹{total}
              </h3>
              <button
                className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
                onClick={() => setConfirmed(true)}
              >
                Confirm Selection
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
              Your Itinerary & Budget
            </h2>

            {/* Payment History Button for non-paid bookings */}
            <div className="flex justify-end mb-4">
              <button
                onClick={fetchPaymentHistory}
                disabled={fetchingPayment}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <History className="w-4 h-4" />
                {fetchingPayment ? "Loading..." : "Check Payment History"}
              </button>
            </div>

            {/* Show Payment History if available */}
            {paymentHistory && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Previous Payment Found
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Payment ID:</strong> {paymentHistory._id}</p>
                    <p><strong>Amount:</strong> ₹{paymentHistory.amount}</p>
                    <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{paymentHistory.status}</span></p>
                  </div>
                  <div>
                    <p><strong>Payment Date:</strong> {new Date(paymentHistory.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Show Itinerary */}
            <div className="bg-gray-100 p-6 rounded-xl shadow mb-6">
              <h3 className="text-xl font-bold text-[#0D3B66] mb-4">
                Trip Itinerary
              </h3>
              <ul className="space-y-2">
                {pkg.itinerary.map((day) => (
                  <li
                    key={day._id}
                    className="p-3 bg-white rounded-lg shadow text-gray-700"
                  >
                    <strong>Day {day.day}: </strong> {day.details}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chosen Activities */}
            {destinations.map((dest) => {
              const chosen = (dest.activities || []).filter((a) =>
                selected.includes(a._id || a.id)
              );
              if (!chosen.length) return null;
              return (
                <div
                  key={dest._id || dest.id}
                  className="bg-gray-100 p-6 rounded-xl shadow mb-6"
                >
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                    {dest.name}
                  </h3>
                  <ul className="space-y-2">
                    {chosen.map((a) => (
                      <li
                        key={a._id || a.id}
                        className="flex justify-between text-gray-700"
                      >
                        <span>{a.name}</span>
                        <span className="font-semibold text-teal-700">
                          ₹{a.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="text-center mt-6">
              <p className="font-semibold text-gray-800 mb-2">
                Base Package Price: ₹{pkg.price}
              </p>
              <h3 className="text-2xl font-bold text-[#0D3B66]">
                Total Budget: ₹{total}
              </h3>

              {!paid ? (
                <div className="mt-4 text-gray-600">
                  <button
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                    onClick={handlePayNow}
                  >
                    Pay Now
                  </button>
                  <button
                    className="mt-4 ml-3 px-6 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
                    onClick={() => setConfirmed(false)}
                  >
                    Go Back
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-gray-600">
                  <p className="mt-4 text-green-700 font-bold text-lg">
                    ✅ Payment Successful!
                  </p>
                  <button
                    className="mt-4 ml-3 px-6 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
                    onClick={handleNavigate}
                  >
                    Go Home
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}