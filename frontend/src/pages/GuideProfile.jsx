import { Link, useNavigate } from "react-router-dom";

export default function GuideProfile() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/guide-profile/edit"); // 👉 Redirects to edit profile page
  };

  const handleReviews = () => {
    navigate("/guide-profile/reviews"); // 👉 Redirects to reviews page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('../public/images/balloon.png')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Page Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold">
              <span className="text-yellow-600">Wander</span>
              <span className="text-blue-600">Lust</span>
            </span>
          </Link>

          {/* Back to Dashboard */}
          <Link
            to="/guide-dashboard"
            className="text-teal-700 font-medium hover:text-[#E67E22] transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white/95 rounded-2xl shadow-lg p-10 text-center">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src="https://picsum.photos/150"
              alt="Guide Profile"
              className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-md"
            />
          </div>

          {/* Guide Name + Role */}
          <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
          <p className="text-lg text-gray-600 mb-6">🌍 Professional Tour Guide</p>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-8">
            <div>
              <p className="font-semibold text-gray-700">📍 Location</p>
              <p className="text-gray-600">Kathmandu, Nepal</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">📞 Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">📧 Email</p>
              <p className="text-gray-600">johndoe@email.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">⭐ Rating</p>
              <p className="text-yellow-500">4.8 / 5</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            I am an experienced trekking and cultural tour guide with over 10 years
            of guiding adventurers through the Himalayas. I specialize in
            personalized and unforgettable travel experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-[#3E7C6F] text-white rounded-lg shadow-md hover:bg-[#2f6153] transition"
            >
              ✏️ Edit Profile
            </button>
            <button
              onClick={handleReviews}
              className="px-6 py-2 bg-[#E67E22] text-white rounded-lg shadow-md hover:bg-[#cc6c1c] transition"
            >
              ⭐ View Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
