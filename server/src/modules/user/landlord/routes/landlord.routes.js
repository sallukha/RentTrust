import { Router } from 'express'
import { protect, requireRole } from '../../../../middlewares/auth.middleware.js'
import { getMyLandlordProfile, updateMyLandlordProfile } from '../controllers/landlord.controller.js'

const router = Router()

router.use(protect, requireRole('landlord', 'admin'))

router.get('/profile', getMyLandlordProfile)
router.patch('/profile', updateMyLandlordProfile)

export default router
