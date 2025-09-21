import Guide from "../models/Guide.js";

// Get all guides
export const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a guide (Admin only)
export const addGuide = async (req, res) => {
  const { name, bio, achievements, rating } = req.body;
  const guide = await Guide.create({ name, bio, achievements, rating });
  res.json(guide);
};

// Delete a guide (Admin only)
export const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    await guide.remove();
    res.json({ message: "Guide removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
