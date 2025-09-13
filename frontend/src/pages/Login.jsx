import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role.toLowerCase(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      toast.success("Login successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.role === "user") navigate("/dashboard");
      else if (data.role === "guide") navigate("/guide-dashboard");
      else if (data.role === "admin") navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          <span className="text-yellow-600">Wander</span>
          <span className="text-blue-600">Lust</span>
        </h1>

        <h2 className="text-2xl font-bold text-center text-amber-900">Login</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded-md"
          >
            <option value="user">User</option>
            <option value="guide">Guide</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-600 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
