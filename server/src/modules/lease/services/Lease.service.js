// import Lease from '../models/lease.model.js';
// import Property from '../../property/models/property.model.js'; // adjust path to your actual Property module
// import { ApiError } from '../../../utils/ApiError.js'; // shared utils: server/src/utils/ApiError.js

// // ------------------------------------------------------------------
// // SIGNATURE HANDLING & AUTO-ACTIVATION
// // ------------------------------------------------------------------

// /**
//  * Records a signature for the given role on a lease.
//  * If both parties have now signed, activates the lease and marks
//  * the linked property as 'rented'.
//  */
// export const recordSignature = async (lease, role) => {
//   if (lease.status === 'terminated' || lease.status === 'expired') {
//     throw new ApiError(400, `Cannot sign a lease that is already ${lease.status}`);
//   }

//   if (role === 'landlord') {
//     if (lease.landlordSigned) {
//       throw new ApiError(400, 'Landlord has already signed this lease');
//     }
//     lease.landlordSigned = true;
//   } else if (role === 'tenant') {
//     if (lease.tenantSigned) {
//       throw new ApiError(400, 'Tenant has already signed this lease');
//     }
//     lease.tenantSigned = true;
//   } else {
//     throw new ApiError(400, 'Invalid signer role');
//   }

//   // Once both parties have signed, activate the lease
//   if (lease.landlordSigned && lease.tenantSigned) {
//     lease.status = 'active';
//     lease.signedAt = new Date();
//     await activatePropertyForLease(lease);
//   } else {
//     // Only one side has signed so far
//     lease.status = 'pending_signatures';
//   }

//   await lease.save();
//   return lease;
// };

// /**
//  * Marks the linked property as 'rented' once a lease becomes active.
//  */
// const activatePropertyForLease = async (lease) => {
//   const property = await Property.findById(lease.propertyId);

//   if (!property) {
//     throw new ApiError(404, 'Linked property not found');
//   }

//   property.status = 'rented';
//   await property.save();
// };

// // ------------------------------------------------------------------
// // STATUS LIFECYCLE (terminate / renew)
// // ------------------------------------------------------------------

// const VALID_TRANSITIONS = {
//   draft: ['pending_signatures', 'terminated'],
//   pending_signatures: ['active', 'terminated'],
//   active: ['terminated', 'expired'],
//   expired: ['active'], // renewal
//   terminated: [] // terminal state, no further transitions
// };

// /**
//  * Validates and applies a status transition (termination or renewal).
//  * On renewal (expired -> active), also flips the property back to 'rented'.
//  * On termination, frees up the property back to 'available'.
//  */
// export const changeLeaseStatus = async (lease, newStatus) => {
//   const allowedNext = VALID_TRANSITIONS[lease.status] || [];

//   if (!allowedNext.includes(newStatus)) {
//     throw new ApiError(400, `Cannot change lease status from '${lease.status}' to '${newStatus}'`);
//   }

//   lease.status = newStatus;

//   if (newStatus === 'terminated' || newStatus === 'expired') {
//     await releasePropertyForLease(lease);
//   }

//   if (newStatus === 'active') {
//     // Renewal case: property goes back to rented
//     await activatePropertyForLease(lease);
//   }

//   await lease.save();
//   return lease;
// };

// /**
//  * Frees the linked property back to 'available' when a lease ends.
//  */
// const releasePropertyForLease = async (lease) => {
//   const property = await Property.findById(lease.propertyId);

//   if (!property) {
//     throw new ApiError(404, 'Linked property not found');
//   }

//   property.status = 'available';
//   await property.save();
// };

// // Note: Automated monthly invoice generation reads active leases directly
// // (see invoice.service.js -> runMonthlyBillingJob), keyed off lease.status === 'active'
// // and lease fields like monthlyRent / nextDueDate, so no extra wiring is needed here.