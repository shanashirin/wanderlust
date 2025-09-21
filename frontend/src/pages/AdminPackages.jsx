import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminPackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [activeTab, setActiveTab] = useState("list"); // tabs: list, add, edit
  const [selectedPackage, setSelectedPackage] = useState(null);

  const emptyPackage = {
    title: "",
    destination: "",
    price: "",
    duration: "",
    description: "",
    img: "",
    itinerary: [{ day: "", details: "" }],
    destinations: [{ name: "", description: "", activities: [{ name: "", price: 0 }] }],
  };

  const [formPackage, setFormPackage] = useState(emptyPackage);

  // Fetch all packages
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

  // Handle input changes
  const handleChange = (e, index = null, subIndex = null, field = null) => {
    const { name, value } = e.target;

    if (field === "itinerary") {
      const updated = [...formPackage.itinerary];
      updated[index][name] = value;
      setFormPackage({ ...formPackage, itinerary: updated });
    } else if (field === "destination") {
      const updated = [...formPackage.destinations];
      if (subIndex !== null) {
        updated[index].activities[subIndex][name] = value;
      } else {
        updated[index][name] = value;
      }
      setFormPackage({ ...formPackage, destinations: updated });
    } else {
      setFormPackage({ ...formPackage, [name]: value });
    }
  };

  // Add/Remove Itinerary Day
  const addItineraryDay = () => setFormPackage(prev => ({
    ...prev,
    itinerary: [...prev.itinerary, { day: "", details: "" }],
  }));
  const removeItineraryDay = (i) => setFormPackage(prev => ({
    ...prev,
    itinerary: prev.itinerary.filter((_, idx) => idx !== i),
  }));

  // Add/Remove Destination or Activity
  const addDestination = () => setFormPackage(prev => ({
    ...prev,
    destinations: [...prev.destinations, { name: "", description: "", activities: [{ name: "", price: 0 }] }],
  }));
  const removeDestination = (i) => setFormPackage(prev => ({
    ...prev,
    destinations: prev.destinations.filter((_, idx) => idx !== i),
  }));
  const addActivity = (i) => {
    const updated = [...formPackage.destinations];
    updated[i].activities.push({ name: "", price: 0 });
    setFormPackage({ ...formPackage, destinations: updated });
  };
  const removeActivity = (i, j) => {
    const updated = [...formPackage.destinations];
    updated[i].activities = updated[i].activities.filter((_, idx) => idx !== j);
    setFormPackage({ ...formPackage, destinations: updated });
  };

  // Add or Update Package
  const savePackage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const method = selectedPackage ? "PUT" : "POST";
      const url = selectedPackage
        ? `http://localhost:5000/api/packages/${selectedPackage._id}`
        : "http://localhost:5000/api/packages";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formPackage),
      });

      if (!res.ok) throw new Error("Failed to save package");
      const data = await res.json();

      if (selectedPackage) {
        setPackages(prev => prev.map(pkg => pkg._id === data._id ? data : pkg));
        toast.success("Package updated!");
      } else {
        setPackages(prev => [...prev, data]);
        toast.success("Package added!");
      }

      setFormPackage(emptyPackage);
      setSelectedPackage(null);
      setActiveTab("list");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save package");
    }
  };

  // Edit Package
  const editPackage = (pkg) => {
    setSelectedPackage(pkg);
    setFormPackage(pkg);
    setActiveTab("edit");
  };

  // Delete Package
  const removePackage = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const res = await fetch(`http://localhost:5000/api/packages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setPackages(prev => prev.filter(pkg => pkg._id !== id));
      toast.success("Package deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete package");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('../public/images/balloon.png')" }}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66]">Admin – Manage Packages</h1>
          <Link to="/admin-dashboard" className="text-teal-700 font-medium hover:text-[#E67E22] transition">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button className={`px-4 py-2 rounded ${activeTab === "list" ? "bg-teal-600 text-white" : "bg-white/80"}`} onClick={() => setActiveTab("list")}>Package List</button>
          <button className={`px-4 py-2 rounded ${activeTab === "add" ? "bg-teal-600 text-white" : "bg-white/80"}`} onClick={() => { setFormPackage(emptyPackage); setActiveTab("add") }}>Add Package</button>
        </div>

        {/* Tab Content */}
        {activeTab === "list" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg._id} className="bg-white/95 rounded-xl shadow-lg overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">{pkg.title}</h3>
                  <p className="text-gray-600">{pkg.destination}</p>
                  <p className="text-teal-700 font-bold mt-2">₹{pkg.price}</p>
                  <p className="text-sm text-gray-500 mt-2">{pkg.description}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => editPackage(pkg)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => removePackage(pkg._id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {packages.length === 0 && <p className="text-gray-600 col-span-full text-center">No packages available.</p>}
          </div>
        )}

        {(activeTab === "add" || activeTab === "edit") && (
          <div className="bg-white/90 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedPackage ? "Edit Package" : "Add New Package"}
            </h2>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

              <input
                type="text"
                name="title"
                value={formPackage.title || ""}
                onChange={handleChange}
                placeholder="Package Title *"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="destination"
                value={formPackage.destination || ""}
                onChange={handleChange}
                placeholder="Destination *"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="duration"
                value={formPackage.duration || ""}
                onChange={handleChange}
                placeholder="Duration"
                className="p-2 border rounded-lg"
              />
              <input
                type="number"
                name="price"
                value={formPackage.price || ""}
                onChange={handleChange}
                placeholder="Price *"
                className="p-2 border rounded-lg"
              />
              <div className="mb-4">
                <label className="font-semibold mb-1 block">Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={formPackage.img || ""}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className={`p-2 border rounded-lg w-full ${formPackage.img && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(formPackage.img)
                      ? "border-red-500"
                      : "border-gray-300"
                    }`}
                />
                {formPackage.img && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(formPackage.img) && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid image URL</p>
                )}
              </div>
              <textarea
                name="description"
                value={formPackage.description || ""}
                onChange={handleChange}
                placeholder="Description"
                className="p-2 border rounded-lg col-span-1 sm:col-span-2"
              />
            </div>

            {/* Itinerary */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Itinerary</h3>
              {(formPackage.itinerary || []).map((day, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    name="day"
                    value={day.day || ""}
                    placeholder="Day"
                    onChange={(e) => handleChange(e, i, null, "itinerary")}
                    className="p-2 border rounded-lg w-24"
                  />
                  <input
                    type="text"
                    name="details"
                    value={day.details || ""}
                    placeholder="Details"
                    onChange={(e) => handleChange(e, i, null, "itinerary")}
                    className="p-2 border rounded-lg flex-1"
                  />
                  <button onClick={() => removeItineraryDay(i)} className="px-2 bg-red-600 text-white rounded">
                    X
                  </button>
                </div>
              ))}
              <button onClick={addItineraryDay} className="px-3 py-1 bg-teal-600 text-white rounded mt-2">
                Add Day
              </button>
            </div>

            {/* Destinations & Activities */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Destinations & Activities</h3>
              {(formPackage.destinations || []).map((dest, i) => (
                <div key={i} className="border p-3 rounded mb-2">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      name="name"
                      value={dest.name || ""}
                      placeholder="Destination Name"
                      onChange={(e) => handleChange(e, i, null, "destination")}
                      className="p-2 border rounded-lg flex-1"
                    />
                    <input
                      type="text"
                      name="description"
                      value={dest.description || ""}
                      placeholder="Description"
                      onChange={(e) => handleChange(e, i, null, "destination")}
                      className="p-2 border rounded-lg flex-1"
                    />
                    <button onClick={() => removeDestination(i)} className="px-2 bg-red-600 text-white rounded">
                      X
                    </button>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">Activities</h4>
                    {(dest.activities || []).map((act, j) => (
                      <div key={j} className="flex gap-2 mb-1">
                        <input
                          type="text"
                          name="name"
                          value={act.name || ""}
                          placeholder="Activity Name"
                          onChange={(e) => handleChange(e, i, j, "destination")}
                          className="p-2 border rounded-lg flex-1"
                        />
                        <input
                          type="number"
                          name="price"
                          value={act.price || 0}
                          placeholder="Price"
                          onChange={(e) => handleChange(e, i, j, "destination")}
                          className="p-2 border rounded-lg w-28"
                        />
                        <button onClick={() => removeActivity(i, j)} className="px-2 bg-red-600 text-white rounded">
                          X
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addActivity(i)} className="px-2 py-1 bg-teal-600 text-white rounded mt-1">
                      Add Activity
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addDestination} className="px-3 py-1 bg-teal-600 text-white rounded mt-2">
                Add Destination
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={savePackage}
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
            >
              {selectedPackage ? "Update Package" : "Save Package"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
