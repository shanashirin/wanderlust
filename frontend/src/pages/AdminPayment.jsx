import React, { useEffect, useState } from "react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch all payments from backend
    fetch("http://localhost:5000/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
        Payment Management
      </h1>
      <table className="w-full border-collapse shadow-lg bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#3E7C6F] text-white">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Guide</th>
            <th className="p-3 text-left">Total Amount</th>
            <th className="p-3 text-left">Admin Share</th>
            <th className="p-3 text-left">Guide Share</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.userName}</td>
              <td className="p-3">{p.guideName}</td>
              <td className="p-3">₹{p.amount}</td>
              <td className="p-3 text-green-600">₹{p.amount / 2}</td>
              <td className="p-3 text-blue-600">₹{p.amount / 2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
