import { Router } from 'express'
import { getAllUsers, getUserProfile, uploadUserFile } from '../controllers/user.controller.js'
import { protect, requireRole } from "../../../middlewares/auth.middleware.js"
import { upload } from '../../../middlewares/Multer.middleware.js'

const router = Router()

router.get('/profile', protect, getUserProfile)
router.post('/upload', protect, upload.single('file'), uploadUserFile)
router.get('/', protect, requireRole('admin'), getAllUsers)

export default router
