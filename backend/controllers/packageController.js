import Package from "../models/Package.js";

// Get all packages
export const getPackages = async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
};

// Add a package (Admin only)
export const addPackage = async (req, res) => {
  const { title, description, price, activities } = req.body;
  const pkg = await Package.create({ title, description, price, activities });
  res.json(pkg);
};

// Update package
export const updatePackage = async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (pkg) {
    pkg.title = req.body.title || pkg.title;
    pkg.description = req.body.description || pkg.description;
    pkg.price = req.body.price || pkg.price;
    pkg.activities = req.body.activities || pkg.activities;
    const updated = await pkg.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Package not found" });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (pkg) {
    await pkg.deleteOne();
    res.json({ message: "Package removed" });
  } else {
    res.status(404).json({ message: "Package not found" });
  }
};
