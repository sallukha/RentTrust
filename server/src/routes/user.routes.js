import { Router } from 'express'
import { getAllUsers, getUserProfile } from '../controllers/user.controller.js'
import { protect, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/profile', protect, getUserProfile)
router.get('/', protect, requireRole('admin'), getAllUsers)

export default router
