import React from "react";

export default function Contact() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-transparent">
          <h1 className="text-2xl font-extrabold">
            <span className="text-yellow-600">Wander</span>
            <span className="text-green-700">Lust</span>
          </h1>

          {/* Navbar */}
          <nav className="flex gap-8 font-medium text-lg">
            <a href="/packages" className="text-gray-800 hover:text-green-600 transition">
              Packages
            </a>
            <a href="/bookings" className="text-gray-800 hover:text-green-600 transition">
              My Bookings
            </a>
            <a href="/contact" className="text-green-700 font-semibold">
              Contact Us
            </a>
          </nav>
        </header>

        {/* Contact Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#001F54] mb-6">
                Get in Touch
              </h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-semibold">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold text-[#001F54] mb-2">
                Contact Information
              </h2>
              <p className="text-gray-700">
                Have questions or need help planning your trip? Reach out to us anytime.
              </p>
              <div className="space-y-3 text-gray-800 font-medium">
                <p>📍 123 Wanderlust Street, Travel City</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ support@wanderlust.com</p>
              </div>
              <div className="flex gap-5 mt-4">
                <a href="#" className="hover:text-green-700"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-green-700"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-green-700"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:text-green-700"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12 border-t border-gray-200 py-6 px-8 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          {/* <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-green-700">Company</a>
            <a href="#" className="hover:text-green-700">Support</a>
            <a href="#" className="hover:text-green-700">Legal</a>
          </div> */}
          <div className="flex gap-5">
            <a href="#" className="hover:text-green-700"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-green-700"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-green-700"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-green-700"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
