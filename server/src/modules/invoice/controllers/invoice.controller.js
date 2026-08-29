import Invoice from "../models/invoice.model.js";
import { ApiError } from "../../../utils/apiError.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { generateInvoicePdf } from "../services/invoice.service.js";
export const listInvoices = asyncHandler(async (req, res) => {
    const { role, id } = req.user;
    const filter =
        role === "landlord"
            ? { landlordId: id }
            : { tenantId: id };

    const invoices = await Invoice.find(filter).sort({ issuedAt: -1 });

    res.status(200).json({
        success: true,
        data: invoices,
    });
});
export const getInvoiceById = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }
    const { role, id } = req.user;
    const isOwner =
        (role === "landlord" && invoice.landlordId.toString() === id) ||
        (role === "tenant" && invoice.tenantId.toString() === id);

    if (!isOwner) {
        throw new ApiError(403, "Access denied");
    }

    res.status(200).json({
        success: true,
        data: invoice,
    });
});
export const generateInvoice = asyncHandler(async (req, res) => {
    if (req.user.role !== "landlord") {
        throw new ApiError(403, 'Only landlords can generate invoices')
    }
    const { leaseId, tenantId, landlordId, amountDue, dueDate, lineItems } = req.body

    if (landlordId !== req.user.id) {
        throw new ApiError(403, "Cannot generate invoice for another landlord");
    }

    const invoiceNumber = `INV-${Date.now()}-${req.user.id}`
    const invoice = await Invoice.create({
        invoiceNumber,
        leaseId,
        tenantId,
        landlordId,
        amountDue,
        dueDate,
        lineItems
    })
    if (!invoice) {
        throw new ApiError(500, "Failed to generate invoice");
    }
    res.status(201).json({ success: true, data: invoice })
})
export const updateInvoiceStatus = asyncHandler(async (req, res) => {
    const { status } = req.body
    const allowedSttus = ['unpaid', 'paid', 'overdue', 'cancelled']
    if (!allowedSttus.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' })
    }
    const invoice = await Invoice.findById(req.params.id)

    if (!invoice) {
        return res.status(400).json({ success: false, message: 'Invoice not found' })
    }
    const { role, id } = req.user
    if (role !== "landlord" || invoice.landlordId.toString() !== id) {
        return res.status(403).json({ success: false, message: 'Access denied' })
    }
    invoice.status = status
    await invoice.save()

    res.status(200).json({ success: true, data: invoice })
})
export const downloadInvoicePdf = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }
    const { role, id } = req.user;

    const isOwner =
        (role === "landlord" && invoice.landlordId.toString() === id) ||
        (role === "tenant" && invoice.tenantId.toString() === id);

    if (!isOwner) {
        throw new ApiError(403, "Access denied");
    }

    const pdfBuffer = await generateInvoicePdf(invoice);

    if (!pdfBuffer) {
        throw new ApiError(500, "Failed to generate invoice PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${invoice.invoiceNumber}.pdf`
    );

    res.send(pdfBuffer);
});


