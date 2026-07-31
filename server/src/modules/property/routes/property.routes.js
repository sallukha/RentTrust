import express from 'express';
import {
    listProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} from '../controllers/Property.controller.js';
import authMiddleware from '../../../middlewares/auth.middleware.js';
import { upload } from '../../../middlewares/Multer.middleware.js';

const router = express.Router();
router.get('/', listProperties);
router.get('/:id', getPropertyById);

router.post('/', authMiddleware, upload.array('images', 5), createProperty);
router.put('/:id', authMiddleware, upload.array('images', 5), updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

export default router;