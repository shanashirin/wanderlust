import User from "../models/User.js";
import Guide from "../models/Guide.js";
import Package from "../models/Package.js";

// Manage Users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Manage Guides
export const getAllGuides = async (req, res) => {
  const guides = await Guide.find();
  res.json(guides);
};

export const deleteGuide = async (req, res) => {
  const guide = await Guide.findById(req.params.id);
  if (guide) {
    await guide.deleteOne();
    res.json({ message: "Guide deleted" });
  } else {
    res.status(404).json({ message: "Guide not found" });
  }
};

// Manage Packages
export const getAllPackages = async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
};

export const deletePackageByAdmin = async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (pkg) {
    await pkg.deleteOne();
    res.json({ message: "Package deleted by Admin" });
  } else {
    res.status(404).json({ message: "Package not found" });
  }
};
