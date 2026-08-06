import express from 'express';
import {
  getDashboardOverview,
  getRevenueStats,
  getPropertyStats,
  getBookingStats,
  getMaintenanceStats,
  getComplaintStats,
  overridePropertyStatus,
  forceResolveComplaint,
  getActivityLog
} from '../controller/Admin.controller.js';
import { protect, requireRole } from '../../../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect, requireRole('admin'));

// Dashboard overview & breakdowns
router.get('/dashboard', getDashboardOverview);
router.get('/dashboard/revenue', getRevenueStats);
router.get('/dashboard/properties', getPropertyStats);
router.get('/dashboard/bookings', getBookingStats);
router.get('/dashboard/maintenance', getMaintenanceStats);
router.get('/dashboard/complaints', getComplaintStats);

// Direct admin overrides (logged for audit trail)
router.patch('/properties/:id/override-status', overridePropertyStatus);
router.patch('/complaints/:id/force-resolve', forceResolveComplaint);

// Audit trail
router.get('/activity-log', getActivityLog);

export default router;
