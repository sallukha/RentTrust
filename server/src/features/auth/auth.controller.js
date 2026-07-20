import { asyncHandler } from '../../shared/utils/asyncHandler.js'
import { env } from '../../shared/config/env.js'
import { loginUser } from './auth.service.js'

export const login = asyncHandler(async (req, res) => {

    const { user, token, requiresOtpVerification, otp } = await loginUser(req.body)

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

    res.cookie('token', token, {
        httpOnly: true,
        secure: env.nodeEnv === 'production',
        sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
        success: true,
        token,
        data: {
            user: user.toSafeObject(),
        },
    })
})
