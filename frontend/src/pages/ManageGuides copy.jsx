import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminGuideManagement() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields for adding a guide
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    experience: "",
    rating: 0,
  });

  const admin = JSON.parse(localStorage.getItem("userInfo"));
  const token = admin?.token;

  // Redirect if not logged in
  useEffect(() => {
    if (!admin || !token) {
      window.location.href = "/login";
    }
  }, [admin, token]);

  // Fetch guides from backend
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("http://localhost:5000/guides", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setGuides(data);
      } catch (err) {
        console.error("Failed to fetch guides:", err);
        alert("Cannot load guides. Check your network.");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, [token]);

  // Add a new guide
  const addGuide = async () => {
    if (!form.name || !form.email) return alert("Name and Email are required!");
    try {
      const res = await fetch("http://localhost:5000/guides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add guide");

      setGuides((prev) => [...prev, data]);
      setForm({ name: "", email: "", phone: "", bio: "", location: "", experience: "", rating: 0 });
      alert("Guide added successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // Remove guide
  const removeGuide = async (id) => {
    if (!window.confirm("Are you sure you want to remove this guide?")) return;
    try {
      const res = await fetch(`http://localhost:5000/guides/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove guide");
      setGuides((prev) => prev.filter((g) => g._id !== id));
      alert("Guide removed successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading guides...</p>;

  return (
    <div className="min-h-screen py-10 px-6 ">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin – Guide Management</h1>
          <Link to="/admin-dashboard" className="text-teal-700 hover:text-teal-900">← Back</Link>
        </div>

        {/* Add Guide Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Experience"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Rating (0-5)"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            min={0} max={5}
          />
          <button
            onClick={addGuide}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Add Guide
          </button>
        </div>

        {/* Guide List */}
        <div className="space-y-4">
          {guides.length === 0 ? (
            <p className="text-gray-500 text-center">No guides available</p>
          ) : (
            guides.map((guide) => (
              <div
                key={guide._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-bold text-gray-800">{guide.name} {guide.verified ? "" : "(Not Verified)"}</p>
                  <p className="text-gray-600 text-sm">{guide.email} | {guide.phone || "N/A"}</p>
                  <p className="text-gray-600 text-sm">{guide.location} | {guide.experience}</p>
                </div>
                <button
                  onClick={() => removeGuide(guide._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
