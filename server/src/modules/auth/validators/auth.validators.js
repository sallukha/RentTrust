import { ApiError } from '../../../utils/apiError.js'
import { isValidAuthRole, normalizeEmail, normalizePhone } from '../policies/auth.policy.js'

export const validateRegisterPayload = (payload) => {
    const name = String(payload?.name || '').trim()
    const email = normalizeEmail(payload?.email)
    const phone = normalizePhone(payload?.phone)
    const role = String(payload?.role || '').trim()

    if (!name) {
        throw new ApiError(400, 'Name is required')
    }

    if (!email && !phone) {
        throw new ApiError(400, 'Email or phone is required')
    }

    if (!isValidAuthRole(role)) {
        throw new ApiError(400, 'Invalid role type')
    }

    return {
        name,
        email,
        phone,
        role,
    }
}

export const validateLoginPayload = (payload) => {
    const email = normalizeEmail(payload?.email)
    const phone = normalizePhone(payload?.phone)
    const role = String(payload?.role || '').trim()
    const otp = String(payload?.otp || '').trim()

    if (!email && !phone) {
        throw new ApiError(400, 'Email or phone is required')
    }

    if (!isValidAuthRole(role)) {
        throw new ApiError(400, 'Invalid role type')
    }

    return {
        email,
        phone,
        role,
        otp,
    }
}
