import { Router } from 'express'
import { loginAdminUser, registerAdminUser } from '../controllers/adminAuth.controller.js'

const router = Router()

router.post('/register', registerAdminUser)
router.post('/login', loginAdminUser)

export default router
