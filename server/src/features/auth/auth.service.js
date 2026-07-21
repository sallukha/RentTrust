import crypto from 'crypto'
import { User } from '../users/user.model.js'
import { ApiError } from '../../shared/utils/apiError.js'
import { createToken } from '../../shared/utils/jwt.js'
import { buildIdentityLookup, normalizeEmail, normalizePhone } from './auth.policy.js'
import { validateLoginPayload, validateRegisterPayload } from './auth.validators.js'

export const registerUser = async (payload) => {
    const { name, email, phone, role } = validateRegisterPayload(payload)

    const existingUser = await User.findOne(buildIdentityLookup({ email, phone, role }))

    if (existingUser) {
        throw new ApiError(409, 'Account already exists')
    }

    const user = await User.create({
        name,
        email: email || undefined,
        phone: phone || undefined,
        role,
    })

    return {
        user,
    }
}

export const loginUser = async (payload) => {
    const { email, phone, role, otp } = validateLoginPayload(payload)

    const user = await User.findOne(buildIdentityLookup({ email, phone, role })).select(
        '+loginOtpHash +loginOtpExpiresAt'
    )

    if (!user) {
        throw new ApiError(404, 'Account not found')
    }

    if (!user.isActive) {
        throw new ApiError(403, 'Your account is disabled')
    }

    if (!otp) {
        const generatedOtp = generateLoginOtp()

        await user.setLoginOtp(generatedOtp)
        await user.save()

        return {
            user,
            requiresOtpVerification: true,
            otp: generatedOtp,
        }
    }

    const isOtpValid = await user.verifyLoginOtp(otp)

    if (!isOtpValid) {
        throw new ApiError(401, 'Invalid or expired OTP')
    }

    user.clearLoginOtp()
    await user.save()

    return {
        user,
        requiresOtpVerification: false,
        token: createToken(user),
    }
}

const generateLoginOtp = () => {
    return crypto.randomInt(100000, 1000000).toString()
}
