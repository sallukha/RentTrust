import { Router } from 'express'
import { protect, requireRole } from '../../../../middlewares/auth.middleware.js'
import { getMyTenantProfile, updateMyTenantProfile } from '../controllers/tenant.controller.js'
import { createMyRentRequest, listMyRentRequests } from '../controllers/rentRequest.controller.js'

const router = Router()

router.use(protect, requireRole('tenant'))

router.get('/profile', getMyTenantProfile)
router.patch('/profile', updateMyTenantProfile)
router.post('/rent-requests', createMyRentRequest)
router.get('/rent-requests', listMyRentRequests)

export default router
