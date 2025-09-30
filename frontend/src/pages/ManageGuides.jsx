import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminGuideManagement() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("userInfo"));
  const token = admin?.token;

  useEffect(() => {
    if (!admin || !token) {
      window.location.href = "/login";
    }
  }, [admin, token]);

  // ✅ Fetch guides (users with role=guide)
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/guides", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setGuides(data);
      } catch (err) {
        console.error("Failed to fetch guides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, [token]);

  // ✅ Toggle verification
  const toggleVerify = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}/verify`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setGuides((prev) =>
        prev.map((g) => (g._id === id ? { ...g, isVerified: data.isVerified } : g))
      );
    } catch (err) {
      console.error("Failed to toggle verify:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading guides...</p>;

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin – Guide Management
          </h1>
          <Link to="/admin-dashboard" className="text-teal-700 hover:text-teal-900">
            ← Back
          </Link>
        </div>

        {/* Guide List */}
        <div className="space-y-4">
          {guides.length === 0 ? (
            <p className="text-gray-500 text-center">No guides found</p>
          ) : (
            guides.map((guide) => (
              <div
                key={guide._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-bold text-gray-800">
                    {guide.fullName}{" "}
                    {guide.isVerified ? (
                      <span className="text-green-600">(Verified)</span>
                    ) : (
                      <span className="text-red-600">(Not Verified)</span>
                    )}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {guide.email} | {guide.phone || "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Role: {guide.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Place: {guide.place || "N/A"}
                  </p>
                  {guide.certificateUrl && (
                    <a
                      href={guide.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Certificate
                    </a>
                  )}
                </div>

                <button
                  onClick={() => toggleVerify(guide._id)}
                  className={`px-3 py-1 rounded-lg text-white ${guide.isVerified
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {guide.isVerified ? "Unverify" : "Verify"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
