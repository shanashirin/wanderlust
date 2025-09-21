import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify"

export default function AdminDashboard() {
  const guide = JSON.parse(localStorage.getItem("userInfo"));
  console.log(guide)

  useEffect(() => {
    if (!guide || !guide.token) {
      window.location.href = "/login";
    } else if (guide.role !== "admin") {
      toast.error("Access denied. Admins only.");
      window.location.href = "/";
    }
  }, [guide]);
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Dashboard Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Navbar with Logo */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold">
              <span className="text-yellow-600">Wander</span>
              <span className="text-blue-600">Lust</span>
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex justify-center items-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#0D3B66] text-center">
            Admin Dashboard
          </h1>
        </div>

        {/* 3 Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Manage Guides", icon: "🧑‍🏫", link: "/admin/guides" },
            { title: "Manage Users", icon: "👥", link: "/admin/users" },
            { title: "Add Packages", icon: "📦", link: "/admin/packages" },
            { title: "Payments", icon: "💳", link: "/admin/payments" }, // NEW CARD
            { title: "Reviews", icon: "⭐", link: "/admin/reviews" },

          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="bg-white/90 rounded-2xl shadow-lg shadow-teal-200 p-10 flex flex-col items-center justify-center text-center hover:scale-105 transition transform min-h-[220px]"
            >
              {/* Icon with teal + orange gradient */}
              <div className="text-5xl mb-4 text-[#3E7C6F]">
                <span className="inline-block">{item.icon}</span>
              </div>
              <h2 className="font-semibold text-xl text-gray-800 hover:text-[#E67E22] transition">
                {item.title}
              </h2>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              window.location.href = "/";
            }}
            className="bg-[#E74C3C] text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
