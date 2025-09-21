import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  // All Featured Packages
  const featuredPackages = [
    {
      title: "Bali Tropical Escape",
      price: "$1200",
      img: "https://picsum.photos/id/1018/600/400",
    },
    {
      title: "Andes Mountain Trek",
      price: "$2500",
      img: "https://picsum.photos/id/1015/600/400",
    },
    {
      title: "Paris Romantic Getaway",
      price: "$1800",
      img: "https://picsum.photos/id/1011/600/400",
    },
    {
      title: "Hampi Heritage Walk",
      price: "$300",
      img: "https://tse4.mm.bing.net/th/id/OIP.d7g3-JxAJhq0kI_dwOKZxwHaE8?pid=Api&P=0&h=180",
    },
    {
      title: "Goa Beach Escape",
      price: "$400",
      img: "https://blogs.traveleva.in/wp-content/uploads/2024/01/Betul-Beach.jpg",
    },
    {
      title: "Rishikesh Yoga & Adventure",
      price: "$250",
      img: "https://www.andbeyond.com/wp-content/uploads/sites/5/Haridwar-and-Rishikesh.jpg",
    },
    {
      title: "Jaipur Heritage Tour",
      price: "$300",
      img: "https://tse1.mm.bing.net/th/id/OIP.b4x-dGwgamUimIaUGsgWJgHaEY?pid=Api&P=0&h=180",
    },
    {
      title: "Darjeeling Hill Station",
      price: "$400",
      img: "https://tse4.mm.bing.net/th/id/OIP.gbjcg3MbDg5xsEouAIrCBwHaE8?pid=Api&P=0&h=180",
    },
    {
      title: "Manali Adventure Trip",
      price: "$450",
      img: "https://tse4.mm.bing.net/th/id/OIP.XDDqcJCZBE_Nz8wbb8849wHaD4?pid=Api&P=0&h=180",
    },
    {
      title: "Sikkim Scenic Escape",
      price: "$350",
      img: "https://tse1.mm.bing.net/th/id/OIP.QrzIUXbY6FNnxE9HUrphmwHaEK?pid=Api&P=0&h=180",
    },
    {
      title: "Varanasi Spiritual Tour",
      price: "$200",
      img: "https://tse3.mm.bing.net/th/id/OIP.pRGYx0GWKMvYijplPX84jgHaD4?pid=Api&P=0&h=180",
    },
    {
      title: "Andaman Budget Getaway",
      price: "$500",
      img: "https://tse2.mm.bing.net/th/id/OIP.tt6Zd3SN6TuXpTssSbiq8wHaE8?pid=Api&P=0&h=180",
    },
  ];

  // State to control how many are visible
  const [visible, setVisible] = useState(6);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  const handleClick = () => {
    navigate("/dashboard");
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-extrabold">
            <span className="text-yellow-600">Wander</span>
            <span className="text-blue-600">Lust</span>
          </h1>

          <nav className="space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600"
              style={{ color: "#3E7C6F" }}
            >
              Home
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-green-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600">
              Register
            </Link>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#0D3B66" }}
            >
              WanderLust Awaits
            </h2>
            <p className="mb-6" style={{ color: "#3E7C6F" }}>
              Discover breathtaking destinations, plan with ease, and travel
              smarter.
            </p>

            <div className="bg-white/80 p-6 rounded-lg shadow space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Destination"
                className="w-full p-2 border rounded-md"
              />
              <input type="date" className="w-full p-2 border rounded-md" />
              <input
                type="number"
                placeholder="Max budget"
                className="w-full p-2 border rounded-md"
              />
              <button
                className="w-full text-white font-semibold px-6 py-2 rounded-md"
                style={{ backgroundColor: "#3E7C6F" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#357764")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3E7C6F")
                }
              >
                Explore Packages
              </button>
             
            </div>
          </div>

          {/* Right Side */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              alt="Adventure"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Featured Packages */}
        <h3
          className="text-2xl font-bold text-center mt-16 mb-8"
          style={{ color: "#0D3B66" }}
        >
          Featured Packages
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {featuredPackages.slice(0, visible).map((pkg, i) => (
            <div
              key={i}
              className="bg-white/90 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={pkg.img}
                alt={pkg.title}
                className="rounded-lg mb-3 w-full h-48 object-cover"
              />
              <h4 className="font-bold">{pkg.title}</h4>
              <p className="text-green-600 font-semibold">{pkg.price}</p>
              <button
                className="mt-2 w-full text-white py-2 rounded-md"
                style={{ backgroundColor: "#3E7C6F" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#357764")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3E7C6F")
                }
              >
                View Details
              </button>
              <button className="mt-2 w-full text-white py-2 rounded-md" style={{ backgroundColor: "#0D3B66" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0a2a4d")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0D3B66")
                }
                onClick={() => handleClick()}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visible < featuredPackages.length && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Load More...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
