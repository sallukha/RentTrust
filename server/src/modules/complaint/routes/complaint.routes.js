import express from 'express';
import {
  fileComplaint,
  getComplaints,
  getComplaintById,
  resolveComplaint,
  escalateComplaint
} from '../controllers/complaint.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';
import { upload } from '../../../middlewares/Multer.middleware.js'; 

const router = express.Router();

router.use(protect); 

 
router.post('/', upload.array('evidence', 5), fileComplaint);
router.get('/', getComplaints);
router.get('/:id', getComplaintById);
router.patch('/:id/resolve', resolveComplaint);
router.post('/:id/escalate', escalateComplaint);

export default router;
