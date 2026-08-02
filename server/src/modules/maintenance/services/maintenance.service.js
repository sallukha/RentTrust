import { ApiError } from '../../../utils/ApiError.js';  
 

const VALID_TRANSITIONS = {
  open: ['in_progress', 'closed'],
  in_progress: ['resolved', 'open'], // can bounce back to open if repair attempt failed
  resolved: ['closed', 'in_progress'], // can reopen if tenant reports issue persists
  closed: [] // terminal state
};

/**
 * Validates that a status change is a legal transition, throws ApiError otherwise.
 */
export const validateStatusTransition = (currentStatus, newStatus) => {
  const allowedNext = VALID_TRANSITIONS[currentStatus] || [];

  if (!allowedNext.includes(newStatus)) {
    throw new ApiError(400, `Cannot change ticket status from '${currentStatus}' to '${newStatus}'`);
  }
};

/**
 * A contractor must be assigned before a ticket can move to in_progress.
 */
export const validateContractorAssignedForProgress = (ticket, newStatus) => {
  if (newStatus === 'in_progress' && !ticket.assignedContractor?.name) {
    throw new ApiError(400, 'Assign a contractor before marking this ticket as in progress');
  }
};

// ------------------------------------------------------------------
// NOTIFICATION ALERTS
// ------------------------------------------------------------------

/**
 * Fires when a new ticket is submitted. Urgent/high priority tickets
 * should alert the landlord immediately.
 */
export const notifyNewTicket = async (ticket) => {
  try {
    if (ticket.priority === 'urgent' || ticket.priority === 'high') {
      console.log(
        `[URGENT ALERT] New ${ticket.priority} priority ticket "${ticket.title}" submitted for property ${ticket.propertyId}. Notifying landlord ${ticket.landlordId} immediately.`
      );
      // await notificationService.send({ to: ticket.landlordId, type: 'URGENT_TICKET', ticketId: ticket._id });
    } else {
      console.log(`[Notification] New ticket "${ticket.title}" submitted for property ${ticket.propertyId}.`);
      // await notificationService.send({ to: ticket.landlordId, type: 'NEW_TICKET', ticketId: ticket._id });
    }
  } catch (error) {
    console.error('[Notification] Failed to send new ticket alert:', error.message);
  }
};

/**
 * Fires whenever a ticket's status changes — notifies the tenant.
 */
export const notifyStatusChange = async (ticket) => {
  try {
    console.log(
      `[Notification] Ticket "${ticket.title}" status changed to '${ticket.status}'. Notifying tenant ${ticket.tenantId}.`
    );
    // await notificationService.send({ to: ticket.tenantId, type: 'TICKET_STATUS_CHANGED', ticketId: ticket._id });
  } catch (error) {
    console.error('[Notification] Failed to send status change alert:', error.message);
  }
};

/**
 * Fires when a contractor is assigned — notifies the tenant who reported the issue.
 */
export const notifyContractorAssigned = async (ticket) => {
  try {
    console.log(
      `[Notification] Contractor "${ticket.assignedContractor?.name}" assigned to ticket "${ticket.title}". Notifying tenant ${ticket.tenantId}.`
    );
    // await notificationService.send({ to: ticket.tenantId, type: 'CONTRACTOR_ASSIGNED', ticketId: ticket._id });
  } catch (error) {
    console.error('[Notification] Failed to send contractor assignment alert:', error.message);
  }
};