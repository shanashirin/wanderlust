import { useState } from "react";
import { Link } from "react-router-dom";

export default function GuideTours() {
  const [tours, setTours] = useState([
    {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "A 12-day trek to the base of the world's tallest mountain.",
      price: 25000,
    },
    {
      id: 2,
      title: "Pokhara City Tour",
      description: "Explore Phewa Lake, Davis Falls, and the Peace Pagoda.",
      price: 5000,
    },
  ]);

  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    price: "",
  });

  // ✅ Add a new tour
  const addTour = () => {
    if (!newTour.title || !newTour.description || !newTour.price) return;
    setTours([
      ...tours,
      { id: Date.now(), ...newTour, price: parseInt(newTour.price) },
    ]);
    setNewTour({ title: "", description: "", price: "" });
  };

  // ✅ Delete a tour
  const deleteTour = (id) => {
    setTours(tours.filter((t) => t.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">My Tours</h1>
          <Link
            to="/guide-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add New Tour Form */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">➕ Add a New Tour</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Tour Title"
              value={newTour.title}
              onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTour.description}
              onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newTour.price}
              onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
              className="p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={addTour}
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            Add Tour
          </button>
        </div>

        {/* List of Tours */}
        <div className="space-y-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white/95 rounded-xl shadow-lg p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
                <p className="text-gray-600">{tour.description}</p>
                <p className="text-teal-700 font-semibold mt-2">₹{tour.price}</p>
              </div>
              <button
                onClick={() => deleteTour(tour.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
          {tours.length === 0 && (
            <p className="text-gray-600 text-center">No tours added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
