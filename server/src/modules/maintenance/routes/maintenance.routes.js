 import express from 'express';
import {
  submitTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  assignContractor
} from '../controllers/maintenance.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';
import { upload } from '../../../middlewares/multer.middleware.js'; // shared multer middleware

const router = express.Router();

router.use(protect); // protects all maintenance routes below

// upload.array('images', 5) -> field name must be "images" in the multipart form, max 5 files
router.post('/', upload.array('images', 5), submitTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.patch('/:id/status', updateTicketStatus);
router.patch('/:id/assign', assignContractor);

export default router;
