import Booking from "../models/booking.model.js"
import { checkSlotConflict, notifyBookingStatusChange } from "../services/booking.service.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiError } from "../../../utils/apiError.js"
export const createBooking = asyncHandler(async (req, res) => {
    if (req.user.role !== "tenant") {
        throw new ApiError(403, "Only tenants can create a booking request");
    }
    const {
        propertyId,
        landlordId,
        requestedDate,
        timeSlot,
        notes
    } = req.body
    const booking = await Booking.create({
        propertyId,
        tenantId: req.user.id,
        landlordId,
        requestedDate,
        timeSlot,
        notes,
        status: 'pending'
    })
    res.status(201).json({ success: true, data: booking })
})
export const getBookings = asyncHandler(async (req, res) => {
    const { role, id } = req.user
    const filter = role === 'landlord' ? { landlordId: id } : { tenantId: id }
    const booking = await Booking.find(filter).sort({ requestedDate: 1 })
    res.status(200).json({ success: true, data: bookings })
})
export const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }
    const { role, id } = req.user
    const isParty =
        (role === "landlord" && Booking.landlordId.toString() === id) ||
        (role === "tenant" && Booking.tenantId.toString() === id)
    if (!isParty) {
        throw new ApiError(403, "Access denied");

    }
    res.status(200).json({ success: true, data: booking })
    })

    export const updateBookingStatus = asyncHandler(async (req, res) => {
        const { status } = req.body
        const allowedStatus = ['confirmed', 'rejected']
        
    if (booking.status !== "pending ") {
        throw new ApiError(400, `Cannot update a booking that is already '${booking.status}'`);

    }
    if (!allowedStatus.includes(status)) {
        throw new ApiError(400, "Status must be either 'confirmed' or 'rejected'");
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }
    if (req.user.role !== 'landlord' || booking.landlordId.toString() !== req.user.id) {
        throw new ApiError(403, 'Access denied');
    }

    if (booking.status !== 'pending') {
        throw new ApiError(400, `Cannot update a booking that is already '${booking.status}'`);
    }
    if (status === 'confirmed') {
        await checkSlotConflict(booking.propertyId, booking.requestedDate, booking.timeSlot, booking._id);
    }
    booking.status = status;
    await booking.save();
    await notifyBookingStatusChange(booking);
    res.status(200).json({ success: true, data: booking });

})
export const cancelBooking = asyncHandler(async (req, res) => {

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }

    const { role, id } = req.user
    const isParty =
        (role === 'landlord' && booking.landlordId.toString() === id) ||
        (role === 'tenant' && booking.tenantId.toString() === id);

    if (!isParty) {
        throw new ApiError(403, 'Access denied');
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
        throw new ApiError(400, `Cannot cancel a booking that is already '${booking.status}'`);
    }

    booking.status = 'cancelled';
    await booking.save();
    await notifyBookingStatusChange(booking);
    res.status(200).json({ success: true, message: 'Booking cancelled', data: booking });
})
