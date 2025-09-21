import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function GuidePayments() {
  const [payments, setPayments] = useState([]);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user || !user.token) throw new Error("Not authenticated");

        const res = await fetch("http://localhost:5000/api/payments", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch payments");

        const data = await res.json();
        // Filter only payments related to this guide
        const guidePayments = data.filter(p => p.user?._id === user?._id);
        setPayments(guidePayments);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Total earnings = sum of guide shares (half of each payment)
  const totalEarnings = payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.amount / 2, 0);

  const handlePayoutRequest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const res = await fetch("http://localhost:5000/api/guide/request-payout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to request payout");

      setPayoutRequested(true);
      toast.success("Payout request submitted!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to request payout");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading payments...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">Guide Payments</h1>
          <Link
            to="/guide-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Total Earnings</h2>
          <p className="text-3xl font-extrabold text-green-600">
            ₹{totalEarnings.toFixed(2)}
          </p>

          {!payoutRequested ? (
            <button
              onClick={handlePayoutRequest}
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
            >
              Request Payout
            </button>
          ) : (
            <p className="mt-4 text-green-700 font-medium">✅ Payout Requested!</p>
          )}
        </div>

        {/* Payment List */}
        <div className="space-y-6">
          {payments.length > 0 ? (
            payments.map(payment => (
              <div
                key={payment._id}
                className="bg-white/95 rounded-xl shadow-lg p-6 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-lg text-gray-800">{payment.user.fullName}</p>
                  <p className="text-gray-600">📍 {payment.package.title}</p>
                  <p className="text-gray-500">
                    📅 {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                  <p
                    className={`mt-1 font-medium ${payment.status === "paid" ? "text-green-600" : "text-yellow-600"
                      }`}
                  >
                    Status: {payment.status}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-teal-700">
                    ₹{(payment.amount / 2).toFixed(2)}
                  </p>
                  {payment.status === "pending" && (
                    <span className="text-sm text-yellow-600 font-medium">
                      Awaiting Payment
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No payments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
