import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [visible, setVisible] = useState(6);

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/packages");
        if (!res.ok) throw new Error("Failed to fetch packages");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch packages");
      }
    };
    fetchPackages();
  }, []);

  const loadMore = () => setVisible(prev => prev + 3);

  const viewDetails = (id) => {
    navigate(`/package/${id}`);
  };

  const handleBook = (id) => {
    navigate(`/bookings/${id}`);
  };
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('../public/images/balloon.png')" }}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-extrabold">
            <span className="text-yellow-600">Wander</span>
            <span className="text-blue-600">Lust</span>
          </h1>

          <nav className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600" style={{ color: "#3E7C6F" }}>Home</Link>
            <Link to="/login" className="text-gray-700 hover:text-green-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600">Register</Link>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#0D3B66" }}>WanderLust Awaits</h2>
            <p className="mb-6" style={{ color: "#3E7C6F" }}>
              Discover breathtaking destinations, plan with ease, and travel smarter.
            </p>

            <div className="bg-white/80 p-6 rounded-lg shadow space-y-4 max-w-md">
              <input type="text" placeholder="Destination" className="w-full p-2 border rounded-md" />
              <input type="date" className="w-full p-2 border rounded-md" />
              <input type="number" placeholder="Max budget" className="w-full p-2 border rounded-md" />
              <button className="w-full text-white font-semibold px-6 py-2 rounded-md" style={{ backgroundColor: "#3E7C6F" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#357764"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#3E7C6F"}
              >
                Explore Packages
              </button>
            </div>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="Adventure" className="rounded-xl shadow-lg" />
          </div>
        </div>

        {/* Packages */}
        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: "#0D3B66" }}>Featured Packages</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {packages.slice(0, visible).map(pkg => (
            <div key={pkg._id} className="bg-white/90 p-4 rounded-lg shadow hover:shadow-md transition">
              <img src={pkg.img || "https://via.placeholder.com/600x400"} alt={pkg.title} className="rounded-lg mb-3 w-full h-48 object-cover" />
              <h4 className="font-bold">{pkg.title}</h4>
              <p className="text-green-600 font-semibold">₹{pkg.price}</p>
              <button
                className="mt-2 w-full text-white py-2 rounded-md"
                style={{ backgroundColor: "#3E7C6F" }}
                onClick={() => viewDetails(pkg._id)}
              >
                View Details
              </button>
              <button
                className="mt-2 w-full text-white py-2 rounded-md"
                style={{ backgroundColor: "#0D3B66" }}
                onClick={() => handleBook(pkg._id)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {visible < packages.length && (
          <div className="flex justify-center">
            <button onClick={loadMore} className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition">
              Load More...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
