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
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("Cannot load users. Check your network.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const viewDetails = (user) => {
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    > <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg"> <div className="flex justify-between items-center mb-6"> <h1 className="text-2xl font-bold text-gray-800">Admin – User Management</h1> <Link to="/admin-dashboard" className="text-teal-700 hover:text-teal-900">
      ← Back </Link> </div>


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
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => viewDetails(user)}
                    className="px-3 py-1 rounded-lg bg-green-600 text-white hover:opacity-90"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for user details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeDetails}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">User Details</h2>
            <p><span className="font-semibold">Name:</span> {selectedUser.fullName}</p>
            <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
            <p><span className="font-semibold">Phone:</span> {selectedUser.phone || "—"}</p>
            <p><span className="font-semibold">Place:</span> {selectedUser.place || "—"}</p>
            <p><span className="font-semibold">Role:</span> {selectedUser.role}</p>
            {selectedUser.role === "guide" && (
              <p>
                <span className="font-semibold">Certificate:</span>{" "}
                {selectedUser.certificateUrl ? (
                  <a
                    href={selectedUser.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Certificate
                  </a>
                ) : (
                  "—"
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>


  );
}
