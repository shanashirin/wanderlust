import Booking from "../models/Booking.js";

// Create booking
// ✅ Create booking safely
export const createBooking = async (req, res) => {
    try {
        const { packageId, guideId } = req.body;

        if (!packageId || !guideId) {
            return res.status(400).json({ message: "Package and guide are required" });
        }

        // Create new booking
        const booking = new Booking({
            userId: req.user._id,   // always from token
            packageId,
            guideId,
            status: "pending",      // default
            date: new Date()
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (err) {
        console.error("❌ Booking creation failed:", err);
        res.status(500).json({ message: err.message || "Failed to create booking" });
    }
};


// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        booking.status = req.body.status;
        await booking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId })
            .populate("packageId")
            .populate("guideId");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bookings for a specific guide
export const getGuideBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ guideId: req.params.guideId })
            .populate("userId", "fullName email") // bring in user details
            .populate("packageId", "title destination"); // bring in package info
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("packageId")
            .populate("guideId");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
