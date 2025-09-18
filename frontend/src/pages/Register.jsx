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
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { fullName, email, phone, place, password, confirmPassword } =
      formData;

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
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

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
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
            />
            <input
              type="text"
              name="place"
              placeholder="Place"
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 mb-3 border rounded-md"
              onChange={handleChange}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded-md"
            >
              <option value="user">User</option>
              <option value="guide">Guide</option>
              {/* <option value="admin">Admin</option> */}
            </select>

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
