import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function ExplorePackages() {
  const [packages, setPackages] = useState([]);
  const [visible, setVisible] = useState(3);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/packages");
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error("❌ Failed to load packages", error);
      }
    };
    fetchPackages();
  }, []);

  const loadMore = () => setVisible((prev) => prev + 3);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(query.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setQuery(search);
    setVisible(3); // reset visible count
  };

  const handleViewDetails = (pkg) => {
    localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    // ✅ Navigate to MyBookings page with packageId
    navigate(`/bookings/${pkg._id}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-center text-[#0D3B66] mb-10">
          Explore Adventure Tours
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3E7C6F] focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#3E7C6F] text-white px-3 py-1 rounded-md hover:bg-[#2f6153] transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {filteredPackages.length > 0 ? (
            filteredPackages.slice(0, visible).map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white/90 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h2 className="font-bold text-lg text-gray-800">{pkg.title}</h2>
                <p className="text-gray-500 text-sm">
                  {pkg.destination} • {pkg.duration}
                </p>
                <p className="text-green-600 font-semibold mt-2">${pkg.price}</p>
                <p className="text-yellow-500 text-sm">⭐ {pkg.rating}</p>
                {/* ✅ Book / View Details */}
                <button
                  onClick={() => handleViewDetails(pkg)}
                  className="mt-3 w-full bg-[#3E7C6F] text-white py-2 rounded-md hover:bg-[#2f6153] transition"
                >
                  Plan & Book
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No results found for "{query}"
            </p>
          )}
        </div>

        {/* Load More */}
        {visible < filteredPackages.length && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Load More Adventures
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
