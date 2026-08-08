import { User } from '../../user/models/user.model.js'
import { createUserProfiles } from '../../user/services/user.service.js'
import { ApiError } from '../../../utils/apiError.js'
import { createToken } from '../../../utils/jwt.js'
import { buildIdentityLookup, normalizeEmail, normalizePhone } from '../policies/auth.policy.js'
import { validateLoginPayload, validateRegisterPayload } from '../validators/auth.validators.js'

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

    await createUserProfiles({ user })

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
        throw new ApiError(401, 'Invalid OTP')
    }

    user.clearLoginOtp()
    user.lastLoginAt = new Date()
    await user.save()

    const token = createToken(user)

    return {
        user,
        token,
    }
}

const generateLoginOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}
