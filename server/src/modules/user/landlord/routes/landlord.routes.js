import { Router } from 'express'
import { protect, requireRole } from '../../../../middlewares/auth.middleware.js'
import { getMyLandlordProfile, updateMyLandlordProfile } from '../controllers/landlord.controller.js'
import {
    listLandlordRentRequests,
    updateRentRequestStatusByLandlord,
} from '../controllers/rentRequest.controller.js'

const router = Router()

router.use(protect, requireRole('landlord', 'admin'))

router.get('/profile', getMyLandlordProfile)
router.patch('/profile', updateMyLandlordProfile)
router.get('/rent-requests', listLandlordRentRequests)
router.patch('/rent-requests/:id/status', updateRentRequestStatusByLandlord)

export default router
