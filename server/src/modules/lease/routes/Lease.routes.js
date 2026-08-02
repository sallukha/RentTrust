import express from 'express';
import {
  createLease,
  signLease,
  getLeases,
  getLeaseById,
  updateLeaseStatus
} from '../controllers/lease.controller.js';
import authMiddleware from '../../auth/middlewares/auth.middleware.js';  

const router = express.Router();

router.use(authMiddleware);  

router.post('/', createLease);
router.get('/', getLeases);
router.get('/:id', getLeaseById);
router.post('/:id/sign', signLease);
router.patch('/:id/status', updateLeaseStatus);

export default router;