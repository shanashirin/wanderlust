import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPackagesManagement() {
  // ✅ Dummy package data (later from DB/API)
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Bali Tropical Escape",
      destination: "Bali, Indonesia",
      price: 1200,
      description: "7-day tropical vacation with beaches, temples, and local tours.",
      img: "https://picsum.photos/id/1018/600/400",
    },
    {
      id: 2,
      title: "Andes Mountain Trek",
      destination: "Cusco, Peru",
      price: 2500,
      description: "10-day guided trek through the Andes with Machu Picchu visit.",
      img: "https://picsum.photos/id/1025/600/400",
    },
    {
      id: 3,
      title: "Swiss Alps Adventure",
      destination: "Zurich, Switzerland",
      price: 3000,
      description: "5-day skiing, hiking, and luxury resort stay in the Alps.",
      img: "https://picsum.photos/id/1015/600/400",
    },
  ]);

  const [newPackage, setNewPackage] = useState({
    title: "",
    destination: "",
    price: "",
    description: "",
    img: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };

  // ✅ Add new package
  const addPackage = () => {
    if (!newPackage.title || !newPackage.destination || !newPackage.price) {
      alert("Please fill in all required fields.");
      return;
    }

    setPackages([
      ...packages,
      { ...newPackage, id: Date.now(), price: parseInt(newPackage.price) },
    ]);

    setNewPackage({ title: "", destination: "", price: "", description: "", img: "" });
  };

  // ✅ Remove package
  const removePackage = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">Admin – Manage Packages</h1>
          <Link
            to="/admin-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add New Package */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Package</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={newPackage.title}
              onChange={handleChange}
              placeholder="Package Title"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="destination"
              value={newPackage.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="p-2 border rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={newPackage.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="img"
              value={newPackage.img}
              onChange={handleChange}
              placeholder="Image URL"
              className="p-2 border rounded-lg"
            />
            <textarea
              name="description"
              value={newPackage.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 border rounded-lg col-span-1 sm:col-span-2"
            ></textarea>
          </div>
          <button
            onClick={addPackage}
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
          >
            Add Package
          </button>
        </div>

        {/* Package List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white/95 rounded-xl shadow-lg overflow-hidden"
            >
              <img src={pkg.img} alt={pkg.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{pkg.title}</h3>
                <p className="text-gray-600">{pkg.destination}</p>
                <p className="text-teal-700 font-bold mt-2">₹{pkg.price}</p>
                <p className="text-sm text-gray-500 mt-2">{pkg.description}</p>
                <button
                  onClick={() => removePackage(pkg.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {packages.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">No packages available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
