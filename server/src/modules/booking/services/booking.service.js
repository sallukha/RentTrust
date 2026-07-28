import Booking from '../models/booking.model.js';
import { ApiError } from '../../../utils/ApiError.js'; // shared utils: server/src/utils/ApiError.js

// ------------------------------------------------------------------
// SLOT CONFLICT CHECKING
// ------------------------------------------------------------------

/**
 * Checks whether the requested date/timeSlot for a property already
 * has a CONFIRMED booking. Pending requests don't block new requests —
 * only confirmed slots are treated as a hard conflict.
 */
export const checkSlotConflict = async (propertyId, requestedDate, timeSlot, excludeBookingId = null) => {
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);
    const conflictQuery = {
        propertyId,
        timeSlot,
        status: 'confirmed',
        requestedDate: { $gte: startOfDay, $lte: endOfDay }
    };
    if (excludeBookingId) {
        conflictQuery._id = { $ne: excludeBookingId };
    }
    const conflict = await Booking.findOne(conflictQuery);
    if (conflict) {
        throw new ApiError(409, 'This time slot is already booked for the selected property');
    }
};

// ------------------------------------------------------------------
// LANDLORD NOTIFICATIONS
// ------------------------------------------------------------------

/**
 * Sends a notification to the landlord/tenant when a booking's status changes.
 * Wire this to your actual notification system (email, push, Socket.io, etc).
 */
export const notifyBookingStatusChange = async (booking) => {
    try {
        if (booking.status === 'confirmed') {
            // Example: notify the tenant that their viewing was approved
            console.log(
                `[Notification] Booking ${booking._id} confirmed. Notifying tenant ${booking.tenantId} for property ${booking.propertyId} on ${booking.requestedDate.toDateString()} (${booking.timeSlot}).`
            );
            // await notificationService.send({ to: booking.tenantId, type: 'BOOKING_CONFIRMED', bookingId: booking._id });
        }

        if (booking.status === 'rejected') {
            console.log(`[Notification] Booking ${booking._id} rejected. Notifying tenant ${booking.tenantId}.`);
            // await notificationService.send({ to: booking.tenantId, type: 'BOOKING_REJECTED', bookingId: booking._id });
        }

        if (booking.status === 'cancelled') {
            console.log(`[Notification] Booking ${booking._id} cancelled.`);
            // await notificationService.send({ to: booking.landlordId, type: 'BOOKING_CANCELLED', bookingId: booking._id });
        }
    } catch (error) {
        // Notification failures should never break the booking flow itself
        console.error('[Notification] Failed to send booking notification:', error.message);
    }
};