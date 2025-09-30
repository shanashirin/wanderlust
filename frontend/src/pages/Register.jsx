import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    place: "",
    password: "",
    confirmPassword: "",
    role: "user",
    certificateUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const {
      fullName,
      email,
      phone,
      place,
      password,
      confirmPassword,
      role,
      certificateUrl,
    } = formData;

  
if (!fullName.trim()) {
  toast.error("Full name is required");
  return false;
}

// Email regex validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  toast.error("Please enter a valid email");
  return false;
}

// Phone number validation (10 digits)
const phoneRegex = /^[0-9]{10}$/;
if (!phoneRegex.test(phone)) {
  toast.error("Phone number must be 10 digits");
  return false;
}

if (!place.trim()) {
  toast.error("Place is required");
  return false;
}

if (password.length < 6) {
  toast.error("Password must be at least 6 characters long");
  return false;
}

if (password !== confirmPassword) {
  toast.error("Passwords do not match!");
  return false;
}

if (role === "guide" && !certificateUrl.trim()) {
  toast.error("Certificate URL is required for guides");
  return false;
}

return true;


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
if (!validateForm()) return;

try {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      place: formData.place,
      password: formData.password,
      role: formData.role.toLowerCase(),
      certificateUrl:
        formData.role === "guide" ? formData.certificateUrl : undefined,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");

  toast.success("Registration successful! Please login.");
  navigate("/login");
} catch (error) {
  toast.error(error.message);
}


  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/balloon.png')",
      }}
    >
      {/* Blur Overlay */} <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

    
      {/* Register Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-96 backdrop-blur-md">
          <h1 className="text-3xl font-extrabold text-center mb-6">
            <span className="text-yellow-600">Wander</span>
            <span className="text-blue-600">Lust</span>
          </h1>

          <h2 className="text-2xl font-bold text-center text-amber-900">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="place"
              placeholder="Place"
              value={formData.place}
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded-md"
            >
              <option value="user">User</option>
              <option value="guide">Guide</option>
            </select>

            {formData.role === "guide" && (
              <div className="mb-3">
                <label className="block mb-1 font-medium text-sm">
                  Google Drive Certificate URL (with public access)
                </label>
                <input
                  type="url"
                  name="certificateUrl"
                  placeholder="https://drive.google.com/..."
                  value={formData.certificateUrl}
                  className="w-full p-2 border rounded-md"
                  onChange={handleChange}
                  required={formData.role === "guide"}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note: Guides must provide a valid certificate/license URL for
                  verification.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-md transition"
            >
              Register
            </button>
          </form>

          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>


);
}
