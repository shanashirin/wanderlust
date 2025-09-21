import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyBookings() {
  const { packageId } = useParams(); // get package id from URL
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user || !user.token) {
    navigate("/login");
  }
  const [pkg, setPkg] = useState(null);
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch package + guides
  useEffect(() => {
    const selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));
    if (!selectedPackage && !packageId) {
      toast.warning("Please select a package first!");
      navigate("/packages");
    }
    const fetchData = async () => {
      try {
        let selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));

        if (!selectedPackage && packageId) {
          const pkgRes = await fetch(`http://localhost:5000/api/packages/${packageId}`);
          selectedPackage = await pkgRes.json();
          setPkg(selectedPackage);
        } else if (selectedPackage) {
          setPkg(selectedPackage);
        } else {
          // alert("Please select a package first!");
          navigate("/packages");
          return;
        }

        const guideRes = await fetch("http://localhost:5000/api/users/guides");
        const guideData = await guideRes.json();
        setGuides(guideData);

      } catch (err) {
        console.error("❌ Failed to fetch", err);
        toast.error("Error fetching data. Please try again.");
        setPkg(null);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [packageId, navigate]);

  // ✅ Handle booking
  const handleBooking = async () => {
    if (!pkg) {
      toast.error("Package not selected!");
      return;
    }
    if (!selectedGuide) {
      toast.warning("Please select a guide before booking!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          packageId: pkg._id,
          guideId: selectedGuide._id,
          userId: user._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      alert("✅ Booking successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}>
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Package Info */}
        {pkg && (
          <div className="bg-white/90 rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-3xl font-bold">{pkg?.title}</h2>
            <p className="text-gray-600">{pkg?.destination} • {pkg?.duration}</p>
            <p className="text-green-600 font-bold mt-2">${pkg?.price}</p>
            <p className="mt-4">{pkg?.description}</p>
          </div>
        )}

        {/* Guides */}
        <h3 className="text-2xl font-bold mb-4">Choose Your Guide</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className={`p-4 rounded-xl shadow-md border cursor-pointer 
        ${selectedGuide?._id === guide._id ? "border-green-600 bg-green-50" : "bg-white/90"}`}
              onClick={() => setSelectedGuide(guide)}
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-teal-700">
                {guide.fullName?.charAt(0).toUpperCase()}
              </div>

              {/* Guide Info */}
              <h4 className="text-lg font-bold text-center">{guide.fullName}</h4>
              <p className="text-sm text-gray-600 text-center">{guide.email}</p>
              <p className="text-sm text-gray-500 text-center">{guide.place || "No location provided"}</p>

              {/* Verification Badge */}
              <p className="text-center mt-2">
                {guide.isVerified ? (
                  <span className="text-green-600 font-semibold">✔ Verified</span>
                ) : (
                  <span className="text-red-500 font-semibold">✖ Not Verified</span>
                )}
              </p>
            </div>
          ))}
        </div>


        {/* Book button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBooking}
            className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700"
          >
            {selectedGuide ? `Book with ${selectedGuide.fullName}` : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
