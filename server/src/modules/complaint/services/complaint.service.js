import { ApiError } from '../../../utils/apiError.js'; // shared utils: server/src/utils/apiError.js

// ------------------------------------------------------------------
// DISPUTE TRIAGE
// ------------------------------------------------------------------

const VALID_TRANSITIONS = {
  submitted: ['under_review', 'rejected', 'escalated'],
  under_review: ['resolved', 'escalated', 'rejected'],
  escalated: ['resolved', 'rejected'], // admin has final say once escalated
  resolved: [], // terminal
  rejected: [] // terminal
};

/**
 * Validates a status transition according to the dispute triage flow.
 */
export const validateStatusTransition = (currentStatus, newStatus) => {
  const allowedNext = VALID_TRANSITIONS[currentStatus] || [];

  if (!allowedNext.includes(newStatus)) {
    throw new ApiError(400, `Cannot change complaint status from '${currentStatus}' to '${newStatus}'`);
  }
};

/**
 * A complaint can only be escalated once it has actually been looked at —
 * skipping straight from 'submitted' to 'escalated' without review is
 * allowed for urgent cases, but a resolved/rejected complaint cannot be escalated.
 */
export const assertCanEscalate = (complaint) => {
  if (['resolved', 'rejected', 'escalated'].includes(complaint.status)) {
    throw new ApiError(400, `Cannot escalate a complaint that is already '${complaint.status}'`);
  }
};

/**
 * Resolution notes are mandatory whenever a complaint moves to
 * 'resolved' or 'rejected' — an empty resolution isn't useful for anyone.
 */
export const assertResolutionNotesProvided = (newStatus, resolutionNotes) => {
  if (['resolved', 'rejected'].includes(newStatus) && !resolutionNotes?.trim()) {
    throw new ApiError(400, 'Resolution notes are required when resolving or rejecting a complaint');
  }
};

// ------------------------------------------------------------------
// RESOLUTION TRACKING / NOTIFICATIONS
// ------------------------------------------------------------------

/**
 * Notifies both parties when a complaint's status changes.
 */
export const notifyComplaintStatusChange = async (complaint) => {
  try {
    console.log(
      `[Notification] Complaint "${complaint.subject}" status changed to '${complaint.status}'. Notifying complainant ${complaint.complainantId}${
        complaint.respondentId ? ` and respondent ${complaint.respondentId}` : ''
      }.`
    );
    // await notificationService.send({ to: complaint.complainantId, type: 'COMPLAINT_STATUS_CHANGED', complaintId: complaint._id });
    // if (complaint.respondentId) await notificationService.send({ to: complaint.respondentId, type: 'COMPLAINT_STATUS_CHANGED', complaintId: complaint._id });
  } catch (error) {
    console.error('[Notification] Failed to send complaint status alert:', error.message);
  }
};

/**
 * Notifies platform admins when a complaint is escalated.
 */
export const notifyAdminEscalation = async (complaint) => {
  try {
    console.log(
      `[ADMIN ALERT] Complaint "${complaint.subject}" (id: ${complaint._id}) has been escalated and needs admin review.`
    );
    // await notificationService.sendToAdmins({ type: 'COMPLAINT_ESCALATED', complaintId: complaint._id });
  } catch (error) {
    console.error('[Notification] Failed to send admin escalation alert:', error.message);
  }
};
