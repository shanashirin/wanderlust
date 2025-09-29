import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const admin = JSON.parse(localStorage.getItem("userInfo"));
  const token = admin?.token;

  // Redirect if not logged in
  useEffect(() => {
    if (!admin || !token) {
      window.location.href = "/login";
    }
  }, [admin, token]);

  // Fetch users dynamically from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // Filter only role === 'user'
        const onlyUsers = data.filter((u) => u.role === "user");
        setUsers(onlyUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("Cannot load users. Check your network.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  // Remove a user
  const removeUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove user");
      setUsers((prev) => prev.filter((u) => u._id !== id));
      alert("User removed successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // Toggle verification
  const toggleVerification = async (user) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}/verify`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to update verification");
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, isVerified: !u.isVerified } : u))
      );
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const viewDetials = (user) => {
    setSelectedUser(user);
    console.log(user);
  }


  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin – User Management</h1>
          <Link to="/admin-dashboard" className="text-teal-700 hover:text-teal-900">
            ← Back
          </Link>
        </div>

        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div>
                  <span className="text-gray-800 font-medium">{user.fullName}</span>
                  {!user.isVerified && (
                    <span className="ml-2 text-sm text-red-600">(Not Verified)</span>
                  )}
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => viewDetials(user)}
                    className={`px-3 py-1 rounded-lg bg-green-600 text-white hover:opacity-90`}
                  >
                    View
                  </button>
                  {/* <button
                    onClick={() => toggleVerification(user)}
                    className={`px-3 py-1 rounded-lg ${user.isVerified
                        ? "bg-yellow-500 text-white"
                        : "bg-green-600 text-white"
                      } hover:opacity-90`}
                  >
                    {user.isVerified ? "Unverify" : "Verify"}
                  </button> */}
                  {/* <button
                    onClick={() => removeUser(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
