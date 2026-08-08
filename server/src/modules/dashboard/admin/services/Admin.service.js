import Property from '../../../property/models/property.model.js';
import Booking from '../../../booking/models/booking.model.js';
import Invoice from '../../../invoice/models/invoice.model.js';
import Lease from '../../../lease/models/lease.model.js';
import Maintenance from '../../../maintenance/models/maintenance.model.js';
import Complaint from '../../../complaint/models/complaint.model.js';
import AdminLog from  "../model/Adminlog.model.js"

// ------------------------------------------------------------------
// PLATFORM OVERVIEW (top-level dashboard summary)
// ------------------------------------------------------------------

/**
 * dashboard payload. Runs all counts in parallel for speed.
 */
export const getPlatformOverview = async () => {
  const [
    totalProperties,
    availableProperties,
    rentedProperties,
    activeLeases,
    pendingBookings,
    confirmedBookings,
    unpaidInvoices,
    overdueInvoices,
    openMaintenanceTickets,
    urgentMaintenanceTickets,
    openComplaints,
    escalatedComplaints
  ] = await Promise.all([
    Property.countDocuments(),
    Property.countDocuments({ status: 'available' }),
    Property.countDocuments({ status: 'rented' }),
    Lease.countDocuments({ status: 'active' }),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'confirmed' }),
    Invoice.countDocuments({ status: 'unpaid' }),
    Invoice.countDocuments({ status: 'overdue' }),
    Maintenance.countDocuments({ status: { $in: ['open', 'in_progress'] } }),
    Maintenance.countDocuments({ priority: 'urgent', status: { $ne: 'closed' } }),
    Complaint.countDocuments({ status: { $in: ['submitted', 'under_review'] } }),
    Complaint.countDocuments({ status: 'escalated' })
  ]);

  return {
    properties: { total: totalProperties, available: availableProperties, rented: rentedProperties },
    leases: { active: activeLeases },
    bookings: { pending: pendingBookings, confirmed: confirmedBookings },
    invoices: { unpaid: unpaidInvoices, overdue: overdueInvoices },
    maintenance: { open: openMaintenanceTickets, urgent: urgentMaintenanceTickets },
    complaints: { pendingReview: openComplaints, escalated: escalatedComplaints }
  };
};

// ------------------------------------------------------------------
// REVENUE OVERVIEW
// ------------------------------------------------------------------

/**
 * Groups paid invoice amounts by month for the current year,
 * giving a simple revenue trend for the admin dashboard.
 */
export const getRevenueOverview = async (year = new Date().getFullYear()) => {
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

  const revenueByMonth = await Invoice.aggregate([
    {
      $match: {
        status: 'paid',
        issuedAt: { $gte: startOfYear, $lte: endOfYear }
      }
    },
    {
      $group: {
        _id: { $month: '$issuedAt' },
        totalRevenue: { $sum: '$amountDue' },
        invoiceCount: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const totalRevenue = revenueByMonth.reduce((sum, month) => sum + month.totalRevenue, 0);

  return { year, totalRevenue, monthly: revenueByMonth };
};

// ------------------------------------------------------------------
// MODULE-SPECIFIC BREAKDOWNS
// ------------------------------------------------------------------

export const getPropertyBreakdown = async () => {
  const breakdown = await Property.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  return breakdown;
};

export const getBookingBreakdown = async () => {
  const breakdown = await Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  return breakdown;
};

export const getMaintenanceBreakdown = async () => {
  const byStatus = await Maintenance.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  const byPriority = await Maintenance.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]);
  return { byStatus, byPriority };
};

export const getComplaintBreakdown = async () => {
  const breakdown = await Complaint.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  return breakdown;
};

// ------------------------------------------------------------------
// ADMIN ACTION LOGGING
// ------------------------------------------------------------------

/**
 * Records an audit trail entry whenever an admin performs a direct
 * override on another module's data (e.g. force-resolving a complaint,
 * manually changing a property's status).
 */
export const logAdminAction = async ({ adminId, action, targetType, targetId, notes }) => {
  await AdminLog.create({ adminId, action, targetType, targetId, notes });
};

/**
 * Fetches recent admin activity, optionally filtered by target type.
 */
export const getAdminActivityLog = async ({ targetType, limit = 50 }) => {
  const filter = targetType ? { targetType } : {};
  return AdminLog.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
};