import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            className="min-h-screen relative flex items-center justify-center"
            style={{
                backgroundImage: "url('../public/images/balloon.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Blur Overlay */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white/70 rounded-xl shadow-lg">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
