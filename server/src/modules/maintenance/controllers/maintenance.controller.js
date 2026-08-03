import Maintenance from '../models/maintenance.model.js';
import {
  validateStatusTransition,
  validateContractorAssignedForProgress,
  notifyNewTicket,
  notifyStatusChange,
  notifyContractorAssigned
} from '../services/maintenance.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js'; // shared utils: server/src/utils/asyncHandler.js
import { ApiError } from '../../../utils/apiError.js'; // shared utils: server/src/utils/apiError.js
import { uploadOnCloudinary } from '../../../utils/Cloudinary.util.js'; // shared utils

// POST /api/maintenance - tenant reports an issue with description and photos
export const submitTicket = asyncHandler(async (req, res) => {
  if (req.user.role !== 'tenant') {
    throw new ApiError(403, 'Only tenants can submit a maintenance ticket');
  }

  const { propertyId, landlordId, category, title, description, priority } = req.body;

  // req.files comes from multer (upload.array('images', 5) on the route)
  const imageFiles = req.files || [];
  let imageUrls = [];

  if (imageFiles.length > 0) {
    const uploadResults = await Promise.all(imageFiles.map((file) => uploadOnCloudinary(file.path)));
    imageUrls = uploadResults.filter((url) => url !== null);
  }

  const ticket = await Maintenance.create({
    propertyId,
    tenantId: req.user.id,
    landlordId,
    category,
    title,
    description,
    priority: priority || 'medium',
    images: imageUrls,
    status: 'open'
  });

  await notifyNewTicket(ticket);

  res.status(201).json({ success: true, data: ticket });
});

// GET /api/maintenance - list tickets, filterable by property, status, priority
export const getTickets = asyncHandler(async (req, res) => {
  const { role, id } = req.user;
  const { propertyId, status, priority } = req.query;

  const filter = role === 'landlord' ? { landlordId: id } : { tenantId: id };

  if (propertyId) filter.propertyId = propertyId;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tickets = await Maintenance.find(filter).sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: tickets });
});

// GET /api/maintenance/:id - single ticket detail
export const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Maintenance.findById(req.params.id);

  if (!ticket) {
    throw new ApiError(404, 'Maintenance ticket not found');
  }

  const { role, id } = req.user;
  const isParty =
    (role === 'landlord' && ticket.landlordId.toString() === id) ||
    (role === 'tenant' && ticket.tenantId.toString() === id);

  if (!isParty) {
    throw new ApiError(403, 'Access denied');
  }

  res.status(200).json({ success: true, data: ticket });
});

// PATCH /api/maintenance/:id/status - landlord updates progress or marks resolved
export const updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ['open', 'in_progress', 'resolved', 'closed'];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }

  const ticket = await Maintenance.findById(req.params.id);

  if (!ticket) {
    throw new ApiError(404, 'Maintenance ticket not found');
  }

  if (req.user.role !== 'landlord' || ticket.landlordId.toString() !== req.user.id) {
    throw new ApiError(403, 'Access denied');
  }

  validateStatusTransition(ticket.status, status);
  validateContractorAssignedForProgress(ticket, status);

  ticket.status = status;
  await ticket.save();

  await notifyStatusChange(ticket);

  res.status(200).json({ success: true, data: ticket });
});

// PATCH /api/maintenance/:id/assign - landlord assigns contractor/service worker
export const assignContractor = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    throw new ApiError(400, 'Contractor name and phone are required');
  }

  const ticket = await Maintenance.findById(req.params.id);

  if (!ticket) {
    throw new ApiError(404, 'Maintenance ticket not found');
  }

  if (req.user.role !== 'landlord' || ticket.landlordId.toString() !== req.user.id) {
    throw new ApiError(403, 'Access denied');
  }

  if (ticket.status === 'closed') {
    throw new ApiError(400, 'Cannot assign a contractor to a closed ticket');
  }

  ticket.assignedContractor = { name, phone };
  await ticket.save();

  await notifyContractorAssigned(ticket);

  res.status(200).json({ success: true, data: ticket });
});
