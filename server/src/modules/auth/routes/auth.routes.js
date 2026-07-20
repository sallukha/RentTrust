import { Router } from 'express'
import {
  getMe,
  login,
  logout,
  signupAdmin,
  signupUser,
} from '../controllers/auth.controller.js'
import { protect } from '../../../middlewares/auth.middleware.js'

const router = Router()

router.post('/signup', signupUser)
router.post('/admin/signup', signupAdmin)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', protect, getMe)

export default router
