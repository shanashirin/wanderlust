import { Link } from "react-router-dom";
import { useState } from "react";

export default function GuideProfileEdit() {
  // Example state – later you can fetch real data from backend
  const [form, setForm] = useState({
    name: "John Doe",
    location: "Kathmandu, Nepal",
    phone: "+91 98765 43210",
    email: "johndoe@email.com",
    bio: "I am an experienced trekking and cultural tour guide...",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile Updated ✅"); 
    // 👉 Later replace this with API call to save profile
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#0D3B66]">Edit Profile</h1>
          <Link
            to="/guide-profile"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Profile
          </Link>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSave}
          className="bg-white/95 p-8 rounded-2xl shadow-lg space-y-6"
        >
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3E7C6F] text-white py-2 rounded-lg shadow-md hover:bg-[#2f6153] transition"
          >
            💾 Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
