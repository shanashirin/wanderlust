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

// ✅ Get single package by ID
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add new package (admin only)
export const addPackage = async (req, res) => {
  try {
    const {
      title,
      destination,
      duration,
      price,
      description,
      img,
      rating,
      itinerary = [],
      destinations = [],
    } = req.body;

    const newPackage = new Package({
      title,
      destination,
      duration,
      price,
      description,
      img,
      rating,
      itinerary,
      destinations,
      createdBy: req.user._id,
    });

    const saved = await newPackage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add package" });
  }
};



// ✅ Update package (admin only)
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    const {
      title,
      destination,
      duration,
      price,
      description,
      img,
      rating,
      itinerary,
      destinations,
    } = req.body;

    pkg.title = title || pkg.title;
    pkg.destination = destination || pkg.destination;
    pkg.duration = duration || pkg.duration;
    pkg.price = price || pkg.price;
    pkg.description = description || pkg.description;
    pkg.img = img || pkg.img;
    pkg.rating = rating || pkg.rating;
    pkg.itinerary = itinerary ?? pkg.itinerary;       // keep existing if not provided
    pkg.destinations = destinations ?? pkg.destinations;


    const updated = await pkg.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update package" });
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
