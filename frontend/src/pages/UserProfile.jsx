import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

export default function UserProfile() {
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: userData?.fullName || "John Doe",
    email: userData?.email || "johndoe@example.com",
    phone: userData?.phone || "+91 98765 43210",
    place: userData?.place || "Kerala, India",
    joined: userData?.createdAt
      ? new Date(userData.createdAt).toLocaleDateString()
      : "January 2024",
    token: userData?.token, // ✅ keep token
    _id: userData?._id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // ✅ Save updated profile with debug logging
  const handleSave = async (e) => {
    e.preventDefault();

    if (!user._id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      setLoading(false);

      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // ✅ send token
        },
        body: JSON.stringify({
          fullName: editedUser.fullName,
          email: editedUser.email,
          phone: editedUser.phone,
          place: editedUser.place,
        }),
      });

      // ✅ Debug log full raw response
      const text = await res.text();
      console.log("🔍 Raw server response:", text.substring(0, 200)); // first 200 chars

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "❌ Server returned invalid JSON. Raw response: " +
            text.substring(0, 100)
        );
      }

      if (!res.ok) throw new Error(data.message || "Update failed");

      // ✅ Save updated user + token in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setEditedUser(data);
      setIsEditing(false);

      toast.success("Profile updated successfully!");
      // navigate("/userdashboard");
    } catch (error) {
      console.error("❌ Update failed:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // ✅ Start editing
  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        {/* Back to Dashboard */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="flex items-center text-teal-700 font-semibold hover:text-[#E67E22] transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isEditing ? "edit" : "view"}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center"
            >
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.c5KXw-wPcnwyyBNayoXfFQHaHa?pid=Api&P=0&h=180"
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-teal-600 mx-auto mb-4 shadow-md"
              />

              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    value={editedUser.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="place"
                    value={editedUser.place}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    disabled={loading}
                  />

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl"
                    >
                      {loading ? "Saving..." : "💾 Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-500 text-white rounded-xl"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{user.fullName}</h2>
                  <p className="text-gray-700">{user.email}</p>
                  <p className="text-gray-600">{user.phone}</p>
                  <p className="text-gray-600">{user.place}</p>
                  <p className="text-sm text-gray-500">
                    Member since {user.joined}
                  </p>
                </>
              )}

              {!isEditing && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-6 py-3 bg-teal-600 text-white rounded-xl"
                  >
                    ✏️ Edit Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
