import { User } from '../users/user.model.js'
import { ApiError } from '../../shared/utils/apiError.js'
import { createToken } from '../../shared/utils/jwt.js'
import { isValidAuthRole } from './auth.model.js'
import crypto from 'crypto'

export const loginUser = async ({ email, phone, role, otp }) => {
    const normalizedEmail = normalizeEmail(email)
    const normalizedPhone = normalizePhone(phone)

    if (!normalizedEmail && !normalizedPhone) {
        throw new ApiError(400, 'Email or phone is required')
    }

    if (!isValidAuthRole(role)) {
        throw new ApiError(400, 'Invalid role type')
    }

    const user = await User.findOne(buildLookupQuery({ email: normalizedEmail, phone: normalizedPhone, role })).select(
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

const buildLookupQuery = ({ email, phone, role }) => {
    const query = { role }

    if (email && phone) {
        query.$or = [{ email }, { phone }]
        return query
    }

    if (email) {
        query.email = email
        return query
    }

    query.phone = phone
    return query
}

const generateLoginOtp = () => {
    return crypto.randomInt(100000, 1000000).toString()
}

const normalizeEmail = (value) => {
    if (!value) return ''

    return String(value).trim().toLowerCase()
}

const normalizePhone = (value) => {
    if (!value) return ''

    return String(value).trim()
}
