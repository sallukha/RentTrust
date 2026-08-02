import express from 'express';
import {
    listInvoices,
    getInvoiceById,
    generateInvoice,
    updateInvoiceStatus,
    downloadInvoicePdf
} from '../controllers/invoice.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';

const router = express.Router();
router.use(protect);
router.get('/', listInvoices);
router.get('/:id', getInvoiceById);
router.post('/generate', generateInvoice);
router.patch('/:id/status', updateInvoiceStatus);
router.get('/:id/pdf', downloadInvoicePdf);
export default router;
