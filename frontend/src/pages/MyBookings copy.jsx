import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [openDay, setOpenDay] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [openGuide, setOpenGuide] = useState(null);
  const navigate = useNavigate();

  const itinerary = [
    { day: "Day 1 : Arrival in Kathmandu & City Exploration", details: "Arrive at Kathmandu International Airport..." },
    { day: "Day 2 : Kathmandu Valley Sightseeing & Preparation", details: "Visit UNESCO World Heritage Sites..." },
    { day: "Day 3 : Fly to Lukla & Trek to Phakding", details: "Take an early morning scenic flight..." },
    { day: "Day 4 : Trek to Namche Bazaar", details: "Continue the trek to Namche Bazaar..." },
    { day: "Day 5 : Acclimatization Day in Namche", details: "Spend a day acclimatizing..." },
    { day: "Day 6 : Trek back to Lukla", details: "Descend through pine forests..." },
    { day: "Day 7 : Fly to Kathmandu & Departure", details: "Take an early morning flight..." },
  ];

  // ✅ Guides with availability set by them (not user)
  const [guides] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      experience: "8 years trekking & cultural tours",
      rating: 4.9,
      achievements: "Completed 50+ Himalayan treks",
      certificates: ["Mountaineering License", "First Aid Certified"],
      reviews: [
        { user: "Amit", comment: "Amazing guide, very professional!", rating: 5 },
        { user: "Neha", comment: "Knowledgeable and friendly.", rating: 4.8 },
      ],
      image: "https://picsum.photos/id/1011/200/200",
      status: "Available",
    },
    {
      id: 2,
      name: "Anita Gurung",
      experience: "5 years Himalayan expeditions",
      rating: 4.7,
      achievements: "Summited Everest Base Camp multiple times",
      certificates: ["Tourism Dept. Approved", "Certified Trek Leader"],
      reviews: [
        { user: "Rahul", comment: "Energetic and supportive!", rating: 4.6 },
        { user: "Sara", comment: "Great experience with Anita.", rating: 4.8 },
      ],
      image: "https://picsum.photos/id/1012/200/200",
      status: "Booked",
    },
    {
      id: 3,
      name: "Aravind Gupta",
      experience: "6 years Himalayan expeditions",
      rating: 4.8,
      achievements: "Summited Everest Base Camp multiple times",
      certificates: ["Tourism Dept. Approved", "Certified Trek Leader"],
      reviews: [
        { user: "Rahul", comment: "Energetic and supportive!", rating: 4.6 },
        { user: "Sara", comment: "Great experience with Anita.", rating: 4.8 },
      ],
      image: "https://tse1.mm.bing.net/th/id/OIP.gkhOpXnP_8u9b_16X5-4dwHaFN?pid=Api&P=0&h=180",
      status: "Available",
    },
  ]);

  // ✅ Handle booking
  const handleBooking = () => {
    if (!selectedGuide) {
      alert("Please select a guide before booking!");
      return;
    }

    if (selectedGuide.status !== "Available") {
      alert("This guide is already taken or booked!");
      return;
    }

    navigate("/budget", { state: { guide: selectedGuide } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center px-8 py-4 bg-transparent">
        <h1 className="text-2xl font-extrabold">
          <span className="text-yellow-600">Wander</span>
          <span className="text-green-700">Lust</span>
        </h1>

        <nav className="flex gap-8 font-medium text-lg">
          <NavLink to="/packages" className={({ isActive }) => (isActive ? "text-green-700 font-semibold" : "text-gray-800 hover:text-green-600 transition")}>
            Packages
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => (isActive ? "text-green-700 font-semibold" : "text-gray-800 hover:text-green-600 transition")}>
            My Bookings
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-green-700 font-semibold" : "text-gray-800 hover:text-green-600 transition")}>
            Contact Us
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-grow max-w-6xl mx-auto px-6 py-10">
        {/* Trek Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src="https://picsum.photos/id/1018/900/600"
            alt="Grand Himalayan Trek"
            className="rounded-xl shadow-lg object-cover"
          />

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-[#001F54]">Grand Himalayan Trek</h2>
              <div className="flex gap-3 mt-4">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  $1,800 per person
                </span>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  7 Days / 6 Nights
                </span>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Embark on an unforgettable adventure through the heart of the Himalayas...
              </p>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Detailed Itinerary</h3>
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
                  onClick={() => setOpenDay(openDay === index ? null : index)}
                >
                  {item.day}
                  <span>{openDay === index ? "−" : "+"}</span>
                </button>
                {openDay === index && <p className="mt-2 text-gray-600">{item.details}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Guide</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className={`p-4 rounded-xl shadow-md border transition 
                  ${selectedGuide?.id === guide.id ? "border-green-600 bg-green-50" : "bg-white/90"}`}
              >
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-green-600"
                />
                <h4 className="text-lg font-bold text-gray-800 text-center">{guide.name}</h4>
                <p className="text-sm text-gray-600 text-center mt-1">{guide.experience}</p>
                <p className="text-yellow-500 font-semibold text-center mt-2">⭐ {guide.rating}</p>

                {/* ✅ Show status only */}
                <p
                  className={`text-center mt-2 font-semibold ${
                    guide.status === "Available"
                      ? "text-green-600"
                      : guide.status === "Booked"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {guide.status}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    className="px-3 py-1 text-sm bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50"
                    onClick={() => setSelectedGuide(guide)}
                    disabled={guide.status !== "Available"}
                  >
                    {selectedGuide?.id === guide.id ? "Selected" : "Select"}
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => setOpenGuide(guide)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleBooking}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
          >
            {selectedGuide ? `Book with ${selectedGuide.name}` : "Plan Budget & Book"}
          </button>
        </div>
      </div>

      {/* Guide Modal */}
      {openGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
              onClick={() => setOpenGuide(null)}
            >
              ✖
            </button>
            <div className="text-center">
              <img
                src={openGuide.image}
                alt={openGuide.name}
                className="w-28 h-28 rounded-full mx-auto border-2 border-teal-600"
              />
              <h3 className="text-xl font-bold mt-3">{openGuide.name}</h3>
              <p className="text-gray-600">{openGuide.experience}</p>
              <p className="text-yellow-500 font-semibold mt-2">⭐ {openGuide.rating}</p>
              <p className="mt-2 font-semibold">Status: {openGuide.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
