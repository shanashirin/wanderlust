import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import GuideDashboard from "./pages/GuideDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ExplorePackages from "./pages/ExplorePackages";
import MyBookings from "./pages/MyBookings";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import BudgetTracker from "./pages/BudgetTracker";
import EmergencyContacts from "./pages/EmergencyContacts";
import UserReviews from "./pages/UserReviews";
import GuideProfile from "./pages/GuideProfile";
import GuideProfileEdit from "./pages/GuideProfileEdit";
import GuideReviews from "./pages/GuideReviews";
import GuideBookings from "./pages/GuideBookings";
import GuideTours from "./pages/GuideTour";
import GuidePayments from "./pages/GuidePayment";
import AdminGuideManagement from "./pages/ManageGuides";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminPackagesManagement from "./pages/AdminPackages";
import AdminPayments from "./pages/AdminPayment";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/guide-dashboard" element={<GuideDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/packages" element={<ExplorePackages />} />
      <Route path="/bookings/:packageId" element={<Booking />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/budget/:bookingId" element={<BudgetTracker />} />
      <Route path="/budget" element={<BudgetTracker />} />
      <Route path="/emergency" element={<EmergencyContacts />} />
      <Route path="/reviews" element={<UserReviews />} />
      <Route path="/guide-profile" element={<GuideProfile />} />
      <Route path="/guide-profile/edit" element={<GuideProfileEdit />} />
      <Route path="/guide-profile/reviews" element={<GuideReviews />} />
      <Route path="/guide-bookings" element={<GuideBookings />} />
      <Route path="/guide-tours" element={<GuideTours />} />
      <Route path="/guide-payments" element={<GuidePayments />} />
      <Route path="/guide-reviews" element={<GuideReviews />} />
      <Route path="/admin/guides" element={<AdminGuideManagement />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/packages" element={<AdminPackagesManagement />} />
      <Route path="/admin/Payments" element={<AdminPayments />} />



    </Routes>
  );
}


