import Guide from "../models/Guide.js";

// Get all guides
export const getGuides = async (req, res) => {
  const guides = await Guide.find();
  res.json(guides);
};

// Add a guide (Admin only)
export const addGuide = async (req, res) => {
  const { name, bio, achievements, rating } = req.body;
  const guide = await Guide.create({ name, bio, achievements, rating });
  res.json(guide);
};
