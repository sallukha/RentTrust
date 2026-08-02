import Lease from '../models/Lease.model.js';
import { recordSignature, changeLeaseStatus } from '../services/lease.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { ApiError } from '../../../utils/apiError.js';
 
export const createLease = asyncHandler(async (req, res) => {
    if (req.user.role !== 'landlord') {
        throw new ApiError(403, 'Only landlords can create a lease');
    }
    const {
        propertyId,
        tenantId,
        startDate,
        endDate,
        monthlyRent,
        securityDeposit,
        termsAndConditions
    } = req.body;
    const lease = await Lease.create({
        propertyId,
        landlordId: req.user.id,
        tenantId,
        startDate,
        endDate,
        monthlyRent,
        securityDeposit,
        termsAndConditions,
        status: 'draft'
    });

    res.status(201).json({ success: true, data: lease });
});


export const signLease = asyncHandler(async (req, res) => {
    const lease = await Lease.findById(req.params.id);

    if (!lease) {
        throw new ApiError(404, 'Lease not found');
    }

    const { role, id } = req.user;

    const isParty =
        (role === 'landlord' && lease.landlordId.toString() === id) ||
        (role === 'tenant' && lease.tenantId.toString() === id);

    if (!isParty) {
        throw new ApiError(403, 'Access denied: you are not a party to this lease');
    }

    const updatedLease = await recordSignature(lease, role);

    res.status(200).json({ success: true, data: updatedLease });
});


export const getLeases = asyncHandler(async (req, res) => {
    const { role, id } = req.user;

    const filter = role === 'landlord' ? { landlordId: id } : { tenantId: id };

    const leases = await Lease.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: leases });
});


export const getLeaseById = asyncHandler(async (req, res) => {
    const lease = await Lease.findById(req.params.id);

    if (!lease) {
        throw new ApiError(404, 'Lease not found');
    }

    const { role, id } = req.user;
    const isParty =
        (role === 'landlord' && lease.landlordId.toString() === id) ||
        (role === 'tenant' && lease.tenantId.toString() === id);

    if (!isParty) {
        throw new ApiError(403, 'Access denied');
    }

    res.status(200).json({ success: true, data: lease });
});


export const updateLeaseStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const allowedStatus = ['draft', 'pending_signatures', 'active', 'expired', 'terminated'];

    if (!allowedStatus.includes(status)) {
        throw new ApiError(400, 'Invalid status value');
    }

    const lease = await Lease.findById(req.params.id);

    if (!lease) {
        throw new ApiError(404, 'Lease not found');
    }


    if (req.user.role !== 'landlord' || lease.landlordId.toString() !== req.user.id) {
        throw new ApiError(403, 'Access denied');
    }

    const updatedLease = await changeLeaseStatus(lease, status);

    res.status(200).json({ success: true, data: updatedLease });
});
