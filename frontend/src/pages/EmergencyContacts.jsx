import React from "react";
import { Shield, PlusCircle, Flag, Phone, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmergencyContacts() {
  const navigate = useNavigate();

  const contacts = [
    {
      name: "Police",
      icon: <Shield className="text-blue-400 w-6 h-6" />,
      phone: "100",
      color: "text-blue-500",
    },
    {
      name: "Hospital",
      icon: <PlusCircle className="text-red-400 w-6 h-6" />,
      phone: "108",
      color: "text-red-500",
    },
    {
      name: "Embassy",
      icon: <Flag className="text-yellow-400 w-6 h-6" />,
      phone: "+91 11 2419 8000",
      color: "text-yellow-500",
    },
    {
      name: "Guide Hotline",
      icon: <Phone className="text-green-400 w-6 h-6" />,
      phone: "+91 98765 43210",
      color: "text-green-500",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Emergency Card */}
      <div className="relative z-10 bg-[#0D1B2A]/90 text-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Emergency Contacts
        </h2>
        <p className="text-gray-300 text-sm mb-6 text-center">
          Quick actions for your safety
        </p>

        <div className="space-y-6 mb-8">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#1B263B] p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                {contact.icon}
                <span className="font-medium">{contact.name}</span>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className={`${contact.color} font-semibold hover:underline`}
              >
                CALL
              </a>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")} // ✅ change route if needed
          className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}
