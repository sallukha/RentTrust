import { ApiError } from '../../../../utils/apiError.js'
import { env } from '../../../../config/env.js'

export const validateAdminSignupSecret = (payload) => {
  const adminSecret = String(payload?.adminSecret || '').trim()

  if (!env.adminSignupSecret) {
    throw new ApiError(500, 'Admin signup is not configured')
  }

  if (!adminSecret || adminSecret !== env.adminSignupSecret) {
    throw new ApiError(403, 'Invalid admin signup secret')
  }
}
