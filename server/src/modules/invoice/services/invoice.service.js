 import cron from 'node-cron';
import PDFDocument from 'pdfkit';
import Invoice from '../models/invoice.model.js';
import Lease from '../../lease/models/Lease.model.js';
import { ApiError } from '../../../utils/apiError.js';

// ------------------------------------------------------------------
// BILLING CALCULATIONS
// ------------------------------------------------------------------

/**
 * Builds lineItems + total amountDue from an active lease record.
 */
export const calculateLineItems = (lease) => {
  if (!lease || !lease.rentAmount) {
    throw new ApiError(400, 'Invalid lease data: rentAmount is required to calculate invoice');
  }

  const lineItems = [{ description: 'Monthly Rent', amount: lease.rentAmount }];

  if (lease.utilityCharge) {
    lineItems.push({ description: 'Utility Charges', amount: lease.utilityCharge });
  }

  if (lease.maintenanceCharge) {
    lineItems.push({ description: 'Maintenance Charge', amount: lease.maintenanceCharge });
  }

  const amountDue = lineItems.reduce((total, item) => total + item.amount, 0);

  return { lineItems, amountDue };
};

// ------------------------------------------------------------------
// PDF GENERATION
// ------------------------------------------------------------------

/**
 * Generates a PDF buffer for a given invoice document.
 */
export const generateInvoicePdf = (invoice) => {
  if (!invoice) {
    throw new ApiError(400, 'Invoice data is required to generate PDF');
  }

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(new ApiError(500, 'Failed to generate invoice PDF', [err.message])));

      doc.fontSize(20).text('RentHub Invoice', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(`Issued At: ${invoice.issuedAt.toDateString()}`);
      doc.text(`Due Date: ${invoice.dueDate.toDateString()}`);
      doc.text(`Status: ${invoice.status.toUpperCase()}`);
      doc.moveDown();

      doc.fontSize(14).text('Charges', { underline: true });
      doc.moveDown(0.5);

      invoice.lineItems.forEach((item) => {
        doc.fontSize(12).text(item.description, { continued: true });
        doc.text(`Rs. ${item.amount}`, { align: 'right' });
      });

      doc.moveDown();
      doc.fontSize(14).text(`Total Amount Due: Rs. ${invoice.amountDue}`, { align: 'right' });

      doc.end();
    } catch (error) {
      reject(new ApiError(500, 'Failed to generate invoice PDF', [error.message]));
    }
  });
};

// ------------------------------------------------------------------
// CRON BILLING JOB — auto-generate invoices 5 days before due date
// ------------------------------------------------------------------

/**
 * Note: asyncHandler wraps Express route handlers with the (req, res, next)
 * signature so errors get forwarded to next(). This cron job has no req/res —
 * it runs on a schedule, not on an HTTP request — so it keeps its own
 * try/catch and throws ApiError for consistent error shape/logging instead.
 */
export const runMonthlyBillingJob = async () => {
  try {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 5);

    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const activeLeases = await Lease.find({
      status: 'active',
      nextDueDate: { $gte: startOfDay, $lte: endOfDay }
    });

    for (const lease of activeLeases) {
      const alreadyExists = await Invoice.findOne({
        leaseId: lease._id,
        dueDate: { $gte: startOfDay, $lte: endOfDay }
      });

      if (alreadyExists) continue;

      const { lineItems, amountDue } = calculateLineItems(lease);

      await Invoice.create({
        invoiceNumber: `INV-${Date.now()}-${lease._id}`,
        leaseId: lease._id,
        tenantId: lease.tenantId,
        landlordId: lease.landlordId,
        amountDue,
        dueDate: lease.nextDueDate,
        lineItems
      });
    }

    console.log(`[Billing Cron] Processed ${activeLeases.length} lease(s).`);
  } catch (error) {
    const apiError =
      error instanceof ApiError ? error : new ApiError(500, 'Billing cron job failed', [error.message]);
    console.error('[Billing Cron] Failed:', apiError.message);
  }
};

/**
 * Call once from server entrypoint after DB connects.
 * Runs daily at 1:00 AM.
 */
export const initBillingCronJob = () => {
  cron.schedule('0 1 * * *', runMonthlyBillingJob);
};
