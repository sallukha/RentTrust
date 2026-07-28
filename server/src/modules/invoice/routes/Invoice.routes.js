import express from 'express';
import {
    listInvoices,
    getInvoiceById,
    generateInvoice,
    updateInvoiceStatus,
    downloadInvoicePdf
} from '../controllers/invoice.controller.js';
import authMiddleware from '../../auth/middlewares/auth.middleware.js';

const router = express.Router();
router.use(authMiddleware);
router.get('/', listInvoices);
router.get('/:id', getInvoiceById);
router.post('/generate', generateInvoice);
router.patch('/:id/status', updateInvoiceStatus);
router.get('/:id/pdf', downloadInvoicePdf);
export default router;