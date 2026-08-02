import Lease from '../models/lease.model.js';
import Property from '../../property/models/property.model.js';  
import { ApiError } from '../../../utils/ApiError.js'; 

 

export const recordSignature = async (lease, role) => {
  if (lease.status === 'terminated' || lease.status === 'expired') {
    throw new ApiError(400, `Cannot sign a lease that is already ${lease.status}`);
  }

  if (role === 'landlord') {
    if (lease.landlordSigned) {
      throw new ApiError(400, 'Landlord has already signed this lease');
    }
    lease.landlordSigned = true;
  } else if (role === 'tenant') {
    if (lease.tenantSigned) {
      throw new ApiError(400, 'Tenant has already signed this lease');
    }
    lease.tenantSigned = true;
  } else {
    throw new ApiError(400, 'Invalid signer role');
  }

 
  if (lease.landlordSigned && lease.tenantSigned) {
    lease.status = 'active';
    lease.signedAt = new Date();
    await activatePropertyForLease(lease);
  } else {
   
    lease.status = 'pending_signatures';
  }

  await lease.save();
  return lease;
};

 

const activatePropertyForLease = async (lease) => {
  const property = await Property.findById(lease.propertyId);

  if (!property) {
    throw new ApiError(404, 'Linked property not found');
  }

  property.status = 'rented';
  await property.save();
};

 
const VALID_TRANSITIONS = {
  draft: ['pending_signatures', 'terminated'],
  pending_signatures: ['active', 'terminated'],
  active: ['terminated', 'expired'],
  expired: ['active'], // renewal
  terminated: [] // terminal state, no further transitions
};

 
export const changeLeaseStatus = async (lease, newStatus) => {
  const allowedNext = VALID_TRANSITIONS[lease.status] || [];

  if (!allowedNext.includes(newStatus)) {
    throw new ApiError(400, `Cannot change lease status from '${lease.status}' to '${newStatus}'`);
  }

  lease.status = newStatus;

  if (newStatus === 'terminated' || newStatus === 'expired') {
    await releasePropertyForLease(lease);
  }

  if (newStatus === 'active') {
    
    await activatePropertyForLease(lease);
  }

  await lease.save();
  return lease;
};

 

const releasePropertyForLease = async (lease) => {
  const property = await Property.findById(lease.propertyId);

  if (!property) {
    throw new ApiError(404, 'Linked property not found');
  }

  property.status = 'available';
  await property.save();
};

 