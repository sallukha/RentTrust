import { env } from '../../../../config/env.js'
import { asyncHandler } from '../../../../utils/asyncHandler.js'
import { loginAdmin, registerAdmin } from '../services/adminAuth.service.js'
export const registerAdminUser = asyncHandler(async (req, res) => {
  const { user } = await registerAdmin(req.body)

  res.status(201).json({
    success: true,
    data: {
      user: user.toSafeObject(),
    },
  })
})

export const loginAdminUser = asyncHandler(async (req, res) => {
  const { user, token, requiresOtpVerification, otp } = await loginAdmin(req.body)

  if (requiresOtpVerification) {
    return res.status(202).json({
      success: true,
      message: 'OTP generated',
      data: {
        user: user.toSafeObject(),
        otp,
      },
    })
  }

  setAuthCookie(res, token)

  res.status(200).json({
    success: true,
    token,
    data: {
      user: user.toSafeObject(),
    },
  })
})

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}
