import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
