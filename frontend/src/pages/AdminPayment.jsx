import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user || !user.token) throw new Error("Not authenticated");

        const res = await fetch("http://localhost:5000/api/payments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-700">Loading payments...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#0D3B66] mb-8">
          Payment Management
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#3E7C6F] text-white text-left">
                <th className="p-3">User</th>
                <th className="p-3">Package</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Admin Share</th>
                <th className="p-3">Guide Share</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.user?.fullName || "N/A"}</td>
                    <td className="p-3">{p.package?.title || "N/A"}</td>
                    <td className="p-3 font-semibold">₹{p.amount}</td>
                    <td className="p-3 text-green-600 font-medium">₹{(p.amount / 2).toFixed(2)}</td>
                    <td className="p-3 text-blue-600 font-medium">₹{(p.amount / 2).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-600">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
