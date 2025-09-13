import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfile() {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
console.log(userData)
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: userData.fullName || "John Doe",
    email: userData.email || "johndoe@example.com",
    phone: "+91 98765 43210",
    location: "Kerala, India",
    joined: "January 2024",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Save changes
  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Profile Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isEditing ? "edit" : "view"} // Unique key triggers animation when switching
            initial={{ opacity: 0, x: 100 }} // start from right
            animate={{ opacity: 1, x: 0 }}   // slide to center
            exit={{ opacity: 0, x: -100 }}   // exit to left
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center"
          >
            {/* Avatar */}
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-teal-600 mx-auto mb-4 shadow-md"
            />

            {/* User Info */}
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="location"
                  value={editedUser.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition mt-4"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#0D3B66]">{user.name}</h2>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <p className="text-gray-600">{user.location}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since {user.joined}
                </p>
              </>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-6">
              {!isEditing && (
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
