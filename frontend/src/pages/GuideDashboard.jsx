import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function GuideDashboard() {
  const guide = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!guide || !guide.token) {
      window.location.href = "/login";
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
          <h1
            className="text-3xl font-extrabold text-center"
            style={{ color: "#0D3B66" }}
          >
            Welcome {guide?.fullName}
          </h1>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Profile", icon: "👤", link: "/guide-profile" },
            { title: "Bookings", icon: "📑", link: "/guide-bookings" },
            { title: "Tours", icon: "🧭", link: "/guide-tours" },
            { title: "Payments", icon: "💲", link: "/guide-payments" },
            { title: "Reviews", icon: "⭐", link: "/guide-reviews" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="bg-white rounded-2xl shadow-lg shadow-teal-200 p-10 flex flex-col items-center justify-center text-center hover:scale-105 transition transform min-h-[220px] w-full"
            >
              <div
                className="text-5xl mb-4"
                style={{ color: i % 2 === 0 ? "#3E7C6F" : "#E67E22" }}
              >
                {item.icon}
              </div>
              <h2 className="font-semibold text-xl text-gray-800">
                {item.title}
              </h2>
            </Link>
          ))}
        </div>

        {/* Logout Button aligned bottom-right */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              window.location.href = "/";
            }}
            className="px-6 py-2 rounded-lg shadow-md text-white transition"
            style={{ backgroundColor: "#E74C3C" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C0392B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E74C3C")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
