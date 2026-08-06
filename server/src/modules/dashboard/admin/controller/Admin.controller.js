import Property from '../../../property/models/property.model.js';
import Complaint from '../../../complaint/models/complaint.model.js';
import {
  getPlatformOverview,
  getRevenueOverview,
  getPropertyBreakdown,
  getBookingBreakdown,
  getMaintenanceBreakdown,
  getComplaintBreakdown,
  logAdminAction,
  getAdminActivityLog
} from '../services/Admin.service.js';
import { asyncHandler } from '../../../../utils/asyncHandler.js';
import { ApiError } from '../../../../utils/apiError.js';

// GET /api/admin/dashboard - top-level summary across all modules
export const getDashboardOverview = asyncHandler(async (req, res) => {
  const overview = await getPlatformOverview();

  res.status(200).json({ success: true, data: overview });
});

// GET /api/admin/dashboard/revenue - paid invoice revenue grouped by month
export const getRevenueStats = asyncHandler(async (req, res) => {
  const { year } = req.query;

  const revenue = await getRevenueOverview(year ? Number(year) : undefined);

  res.status(200).json({ success: true, data: revenue });
});

// GET /api/admin/dashboard/properties - property status breakdown
export const getPropertyStats = asyncHandler(async (req, res) => {
  const breakdown = await getPropertyBreakdown();

  res.status(200).json({ success: true, data: breakdown });
});

// GET /api/admin/dashboard/bookings - booking status breakdown
export const getBookingStats = asyncHandler(async (req, res) => {
  const breakdown = await getBookingBreakdown();

  res.status(200).json({ success: true, data: breakdown });
});

// GET /api/admin/dashboard/maintenance - maintenance status + priority breakdown
export const getMaintenanceStats = asyncHandler(async (req, res) => {
  const breakdown = await getMaintenanceBreakdown();

  res.status(200).json({ success: true, data: breakdown });
});

// GET /api/admin/dashboard/complaints - complaint status breakdown
export const getComplaintStats = asyncHandler(async (req, res) => {
  const breakdown = await getComplaintBreakdown();

  res.status(200).json({ success: true, data: breakdown });
});

// PATCH /api/admin/properties/:id/override-status - admin force-changes a property's status
export const overridePropertyStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const allowedStatus = ['available', 'rented', 'maintenance', 'inactive'];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }

  const property = await Property.findById(req.params.id);

  if (!property) {
    throw new ApiError(404, 'Property not found');
  }

  const previousStatus = property.status;
  property.status = status;
  await property.save();

  await logAdminAction({
    adminId: req.user.id,
    action: 'PROPERTY_STATUS_OVERRIDE',
    targetType: 'Property',
    targetId: property._id,
    notes: notes || `Status changed from '${previousStatus}' to '${status}' by admin`
  });

  res.status(200).json({ success: true, data: property });
});

// PATCH /api/admin/complaints/:id/force-resolve - admin resolves an escalated complaint directly
export const forceResolveComplaint = asyncHandler(async (req, res) => {
  const { status, resolutionNotes } = req.body;
  const allowedStatus = ['resolved', 'rejected'];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Status must be 'resolved' or 'rejected'");
  }

  if (!resolutionNotes?.trim()) {
    throw new ApiError(400, 'Resolution notes are required');
  }

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new ApiError(404, 'Complaint not found');
  }

  complaint.status = status;
  complaint.resolutionNotes = resolutionNotes;
  await complaint.save();

  await logAdminAction({
    adminId: req.user.id,
    action: 'COMPLAINT_FORCE_RESOLVE',
    targetType: 'Complaint',
    targetId: complaint._id,
    notes: resolutionNotes
  });

  res.status(200).json({ success: true, data: complaint });
});

// GET /api/admin/activity-log - view recent admin actions (audit trail)
export const getActivityLog = asyncHandler(async (req, res) => {
  const { targetType, limit } = req.query;

  const logs = await getAdminActivityLog({ targetType, limit });

  res.status(200).json({ success: true, data: logs });
});
