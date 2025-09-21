import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PackageDetails() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/packages/${id}`);
                if (!res.ok) throw new Error("Failed to fetch package");
                const data = await res.json();
                setPkg(data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load package details");
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading package details...</p>;
    if (!pkg) return <p className="text-center mt-10">Package not found.</p>;

    const handleBook = (id) => {
        navigate(`/bookings/${id}`);
    };

    return (
        <div
            className="min-h-screen relative p-6"
            style={{
                backgroundImage: "url('../public/images/balloon.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-[#0D3B66]">{pkg.title}</h1>
                    <Link to="/" className="text-teal-700 hover:text-teal-900">← Back to Home</Link>
                </div>

                <img
                    src={pkg.img || "https://via.placeholder.com/600x400"}
                    alt={pkg.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <p className="text-gray-700 mb-2"><strong>Destination:</strong> {pkg.destination}</p>
                {pkg.duration && <p className="text-gray-700 mb-2"><strong>Duration:</strong> {pkg.duration}</p>}
                <p className="text-teal-700 font-bold text-lg mb-4">Price: ₹{pkg.price}</p>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                {/* Itinerary */}
                {pkg.itinerary?.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#0D3B66] mb-2">Itinerary</h2>
                        <ul className="space-y-2">
                            {pkg.itinerary.map((day, idx) => (
                                <li key={idx} className="bg-gray-100 p-3 rounded-lg">
                                    <span className="font-semibold">Day {day.day || idx + 1}:</span> {day.details}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Destinations & Activities */}
                {pkg.destinations?.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-[#0D3B66] mb-2">Destinations & Activities</h2>
                        {pkg.destinations.map((dest, idx) => (
                            <div key={idx} className="mb-4 bg-gray-50 p-3 rounded-lg shadow">
                                <h3 className="font-semibold text-lg">{dest.name}</h3>
                                <p className="text-gray-600 mb-2">{dest.description}</p>
                                {dest.activities?.length > 0 && (
                                    <ul className="ml-4 list-disc space-y-1">
                                        {dest.activities.map((act, j) => (
                                            <li key={j}>
                                                {act.name} - <span className="text-teal-700 font-semibold">₹{act.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6">
                    <button
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
                        onClick={() => handleBook(pkg._id)}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
