import Complaint from '../models/complaint.model.js';
import {
  validateStatusTransition,
  assertCanEscalate,
  assertResolutionNotesProvided,
  notifyComplaintStatusChange,
  notifyAdminEscalation
} from '../services/complaint.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js'; 
import { ApiError } from '../../../utils/apiError.js'; 
import { uploadOnCloudinary } from '../../../utils/Cloudinary.util.js'; 

export const fileComplaint = asyncHandler(async (req, res) => {
  const { respondentId, propertyId, subject, description } = req.body;


  const evidenceFiles = req.files || [];
  let evidenceUrls = [];

  if (evidenceFiles.length > 0) {
    const uploadResults = await Promise.all(evidenceFiles.map((file) => uploadOnCloudinary(file.path)));
    evidenceUrls = uploadResults.filter((url) => url !== null);
  }

  const complaint = await Complaint.create({
    complainantId: req.user.id,
    respondentId,
    propertyId,
    subject,
    description,
    evidenceUrls,
    status: 'submitted'
  });

  res.status(201).json({ success: true, data: complaint });
});

 
export const getComplaints = asyncHandler(async (req, res) => {
  const { id, role } = req.user;
  const { status } = req.query;

  
  const filter =
    role === 'admin'
      ? {}
      : { $or: [{ complainantId: id }, { respondentId: id }] };

  if (status) filter.status = status;

  const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: complaints });
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new ApiError(404, 'Complaint not found');
  }

  const { role, id } = req.user;
  const isParty =
    role === 'admin' ||
    complaint.complainantId.toString() === id ||
    (complaint.respondentId && complaint.respondentId.toString() === id);

  if (!isParty) {
    throw new ApiError(403, 'Access denied');
  }

  res.status(200).json({ success: true, data: complaint });
});


export const resolveComplaint = asyncHandler(async (req, res) => {
  const { status, resolutionNotes } = req.body;
  const allowedStatus = ['under_review', 'resolved', 'rejected'];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Status must be 'under_review', 'resolved', or 'rejected'");
  }

  if (!['landlord', 'admin'].includes(req.user.role)) {
    throw new ApiError(403, 'Only landlords or admins can resolve complaints');
  }

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new ApiError(404, 'Complaint not found');
  }

   
  if (
    req.user.role === 'landlord' &&
    complaint.respondentId?.toString() !== req.user.id &&
    complaint.complainantId.toString() !== req.user.id
  ) {
    throw new ApiError(403, 'Access denied: you are not a party to this complaint');
  }

  validateStatusTransition(complaint.status, status);
  assertResolutionNotesProvided(status, resolutionNotes);

  complaint.status = status;
  if (resolutionNotes) {
    complaint.resolutionNotes = resolutionNotes;
  }

  await complaint.save();

  await notifyComplaintStatusChange(complaint);

  res.status(200).json({ success: true, data: complaint });
});

 
export const escalateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new ApiError(404, 'Complaint not found');
  }

  const { role, id } = req.user;
  const isParty = complaint.complainantId.toString() === id || complaint.respondentId?.toString() === id;

  if (!isParty && role !== 'admin') {
    throw new ApiError(403, 'Access denied: you are not a party to this complaint');
  }

  assertCanEscalate(complaint);

  complaint.status = 'escalated';
  await complaint.save();

  await notifyAdminEscalation(complaint);

  res.status(200).json({ success: true, data: complaint });
});
