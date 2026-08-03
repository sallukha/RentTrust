import express from 'express';
import {
  createLease,
  signLease,
  getLeases,
  getLeaseById,
  updateLeaseStatus
} from '../controllers/Lease.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';  

const router = express.Router();

router.use(protect);  

router.post('/', createLease);
router.get('/', getLeases);
router.get('/:id', getLeaseById);
router.post('/:id/sign', signLease);
router.patch('/:id/status', updateLeaseStatus);

export default router;
