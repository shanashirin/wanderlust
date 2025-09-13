import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ExplorePackages() {
  const packages = [
    {
      title: "Himalayan Trek",
      country: "Nepal",
      duration: "7 Days / 6 Nights",
      price: "$1200",
      rating: "4.8",
      img: "https://picsum.photos/id/1018/600/400",
    },
    {
      title: "Caribbean Kayaking",
      country: "Belize",
      duration: "5 Days / 4 Nights",
      price: "$950",
      rating: "4.5",
      img: "https://picsum.photos/id/1015/600/400",
    },
    {
      title: "African Wildlife Safari",
      country: "Tanzania",
      duration: "6 Days / 5 Nights",
      price: "$3500",
      rating: "4.9",
      img: "https://picsum.photos/id/1016/600/400",
    },
    {
      title: "Patagonia Climbing Expedition",
      country: "Argentina",
      duration: "8 Days / 7 Nights",
      price: "$1800",
      rating: "4.7",
      img: "https://picsum.photos/id/1019/600/400",
    },
    {
      title: "Great Wall Hiking",
      country: "China",
      duration: "4 Days / 3 Nights",
      price: "$800",
      rating: "4.6",
      img: "https://picsum.photos/id/1021/600/400",
    },
    {
      title: "Northern Lights Hunt",
      country: "Iceland",
      duration: "5 Days / 4 Nights",
      price: "$2200",
      rating: "4.9",
      img: "https://picsum.photos/id/1025/600/400",
    },{
  title: "Kerala Backwaters Retreat",
  country: "India",
  duration: "4 Days / 3 Nights",
  price: "$220",
  rating: "4.5",
  img: "https://tse1.mm.bing.net/th/id/OIP.JHoewS6uVrs8MfW7gB3OegHaE6?pid=Api&P=0&h=180",
},
{
  title: "Kathmandu City Explorer",
  country: "Nepal",
  duration: "3 Days / 2 Nights",
  price: "$180",
  rating: "4.3",
  img: "https://www.discoverwalks.com/blog/wp-content/uploads/2023/10/raimond-klavins-59al83zjtf8-unsplash.jpg",
},
{
  title: "Sri Lanka Beach",
  country: "Sri Lanka",
  duration: "5 Days / 4 Nights",
  price: "$250",
  rating: "4.6",
  img: "https://tse3.mm.bing.net/th/id/OIP.jGZPPj2G3M7wrXT8B-Ms1gHaEK?pid=Api&P=0&h=180",
},
{
  title: "Bangkok Budget Getaway",
  country: "Thailand",
  duration: "4 Days / 3 Nights",
  price: "$300",
  rating: "4.4",
  img: "https://tse1.mm.bing.net/th/id/OIP.xh8HydgdKz_X8HX4DJcVEgHaE7?pid=Api&P=0&h=180",
},
{
  title: "Bali Cultural Escape",
  country: "Indonesia",
  duration: "6 Days / 5 Nights",
  price: "$280",
  rating: "4.7",
  img: "https://tse2.mm.bing.net/th/id/OIP.OBv_9SXcxYdxwAt_ygHcHwHaE8?pid=Api&P=0&h=180",
},
{
  title: "Cappadocia",
  country: "Turkey",
  duration: "3 Days / 2 Nights",
  price: "$320",
  rating: "4.8",
  img: "https://tse1.mm.bing.net/th/id/OIP.HYEVlTWjyssW5hRrqwYs_QHaE8?pid=Api&P=0&h=180",
},

{
  title: "Siem Reap Temple Visit",
  country: "Cambodia",
  duration: "4 Days / 3 Nights",
  price: "$230",
  rating: "4.5",
  img: "https://royalstockphoto.s3.amazonaws.com/wp-content/uploads/2014/03/12182715/A372-Sunrise-at-the-Angkor-Wat-Temple-in-Siem-Reap-Cambodia-original.jpg",
},
  ];

  // State: how many packages to show
  const [visible, setVisible] = useState(3);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      {/* Top Navbar */}
      <header className="relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold">
            <span className="text-yellow-600">Wander</span>
            <span className="text-blue-600">Lust</span>
          </h1>

          {/* Menu with active highlight */}
          <nav className="space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/packages"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              Packages
            </NavLink>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              My Bookings
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              Contact Us
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-center text-[#0D3B66] mb-10">
          Explore Adventure Tours
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Uncover breathtaking destinations and thrilling experiences with our
          expertly curated travel packages.
        </p>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search destination or package..."
            className="p-2 border rounded-md w-full sm:w-96"
          />
          <button className="bg-[#3E7C6F] text-white px-6 py-2 rounded-md hover:bg-[#2f6153] transition">
            Search
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {packages.slice(0, visible).map((pkg, i) => (
            <div
              key={i}
              className="bg-white/90 p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={pkg.img}
                alt={pkg.title}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h2 className="font-bold text-lg text-gray-800">{pkg.title}</h2>
              <p className="text-gray-500 text-sm">
                {pkg.country} • {pkg.duration}
              </p>
              <p className="text-green-600 font-semibold mt-2">{pkg.price}</p>
              <p className="text-yellow-500 text-sm">⭐ {pkg.rating}</p>
              <button className="mt-3 w-full bg-[#3E7C6F] text-white py-2 rounded-md hover:bg-[#2f6153] transition">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visible < packages.length && (
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
