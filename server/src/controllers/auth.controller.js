import { env } from '../config/env.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { createToken } from '../utils/jwt.js'

export const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const user = await createAccount({ name, email, password, role: 'user' })
  sendAuthResponse(res, 201, user)
})
export const signupAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, adminSecret } = req.body

  if (!env.adminSignupSecret || adminSecret !== env.adminSignupSecret) {
    throw new ApiError(403, 'Invalid admin signup secret')
  }

  const user = await createAccount({ name, email, password, role: 'admin' })
  sendAuthResponse(res, 201, user)
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Your account is disabled')
  }

  sendAuthResponse(res, 200, user)
})

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
})

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user.toSafeObject(),
    },
  })
})

const createAccount = async ({ name, email, password, role }) => {
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email and password are required')
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ApiError(409, 'Email already registered')
  }

  return User.create({ name, email, password, role })
}

const sendAuthResponse = (res, statusCode, user) => {
  const token = createToken(user)

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user: user.toSafeObject(),
    },
  })
}
