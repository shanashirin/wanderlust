import { useState } from "react";
import { Link } from "react-router-dom";

export default function GuidePayments() {
  const [payments] = useState([
    {
      id: 1,
      user: "Alice",
      destination: "Everest Base Camp",
      date: "2025-09-05",
      amount: 25000,
      status: "paid",
    },
    {
      id: 2,
      user: "Ravi",
      destination: "Pokhara City Tour",
      date: "2025-09-12",
      amount: 5000,
      status: "pending",
    },
    {
      id: 3,
      user: "Sophia",
      destination: "Annapurna Trek",
      date: "2025-09-20",
      amount: 18000,
      status: "paid",
    },
  ]);

  const [payoutRequested, setPayoutRequested] = useState(false);

  const totalEarnings = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  // ✅ Handle payout request
  const handlePayoutRequest = () => {
    setPayoutRequested(true);

    // (Later: Call backend API here to request payout)
    console.log("Payout request submitted!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">Payments</h1>
          <Link
            to="/guide-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Total Earnings
          </h2>
          <p className="text-3xl font-extrabold text-green-600">
            ₹{totalEarnings}
          </p>

          {!payoutRequested ? (
            <button
              onClick={handlePayoutRequest}
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
            >
              Request Payout
            </button>
          ) : (
            <p className="mt-4 text-green-700 font-medium">
              ✅ Payout Requested!
            </p>
          )}
        </div>

        {/* Payment List */}
        <div className="space-y-6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white/95 rounded-xl shadow-lg p-6 flex justify-between items-center"
            >
              {/* Payment Info */}
              <div>
                <p className="font-bold text-lg text-gray-800">
                  {payment.user}
                </p>
                <p className="text-gray-600">📍 {payment.destination}</p>
                <p className="text-gray-500">📅 {payment.date}</p>
                <p
                  className={`mt-1 font-medium ${
                    payment.status === "paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {payment.status}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="text-lg font-bold text-teal-700">
                  ₹{payment.amount}
                </p>
                {payment.status === "pending" && (
                  <span className="text-sm text-yellow-600 font-medium">
                    Awaiting Payment
                  </span>
                )}
              </div>
            </div>
          ))}
          {payments.length === 0 && (
            <p className="text-gray-600 text-center">No payments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
