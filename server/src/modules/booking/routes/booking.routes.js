import express from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking
} from '../controllers/booking.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';  
const router = express.Router();
router.use(protect); // protects all booking routes below
router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);
router.delete('/:id', cancelBooking);

export default router;
