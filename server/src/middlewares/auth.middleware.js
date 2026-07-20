import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../modules/user/models/user.model.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const protect = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req)

  if (!token) {
    throw new ApiError(401, 'Login required')
  }

  const payload = jwt.verify(token, env.jwtSecret)
  const user = await User.findById(payload.userId)

  if (!user || !user.isActive) {
    throw new ApiError(401, 'User not found or inactive')
  }

  req.user = user
  next()
})

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission for this action')
    }

    next()
  }
}

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]
  }

  return req.cookies?.token
}
