import Package from "../models/packageModel.js";

// ✅ Get all packages (users)
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

// ✅ Add new package (admin only)
export const addPackage = async (req, res) => {
  try {
    const { title, destination, duration, price, description, img, rating } = req.body;

    const newPackage = new Package({
      title,
      destination,
      duration,
      price,
      description,
      img,
      rating,
      createdBy: req.user._id, // admin who created it
    });

    const saved = await newPackage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add package" });
  }
};

// ✅ Delete package (admin only)
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    await pkg.deleteOne();
    res.json({ message: "Package removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete package" });
  }
};
