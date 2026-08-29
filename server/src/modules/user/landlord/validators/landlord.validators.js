import { ApiError } from '../../../../utils/apiError.js'

const ALLOWED_OWNER_TYPES = new Set(['individual', 'company', 'agent'])

export const validateLandlordProfileUpdate = (payload) => {
    const name = payload?.name ? String(payload.name).trim() : undefined
    const avatarUrl = payload?.avatarUrl ? String(payload.avatarUrl).trim() : undefined
    const preferredLanguage = payload?.preferredLanguage
        ? String(payload.preferredLanguage).trim()
        : undefined
    const dateOfBirth = payload?.dateOfBirth ? String(payload.dateOfBirth).trim() : undefined
    const notificationPrefs = payload?.notificationPrefs
    const displayName = payload?.displayName ? String(payload.displayName).trim() : undefined
    const ownerType = payload?.ownerType ? String(payload.ownerType).trim() : undefined
    const companyName = payload?.companyName ? String(payload.companyName).trim() : undefined
    const businessEmail = payload?.businessEmail ? String(payload.businessEmail).trim().toLowerCase() : undefined
    const businessPhone = payload?.businessPhone ? String(payload.businessPhone).trim() : undefined
    const address = payload?.address
    const taxDetails = payload?.taxDetails
    const bankDetails = payload?.bankDetails
    const isAcceptingBookings =
        payload?.isAcceptingBookings !== undefined ? payload.isAcceptingBookings : undefined
    const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined

    if (name !== undefined && (name.length < 2 || name.length > 60)) {
        throw new ApiError(400, 'name must be between 2 and 60 characters')
    }

    if (displayName !== undefined && (displayName.length < 2 || displayName.length > 80)) {
        throw new ApiError(400, 'displayName must be between 2 and 80 characters')
    }

    if (ownerType !== undefined && !ALLOWED_OWNER_TYPES.has(ownerType)) {
        throw new ApiError(400, 'Invalid ownerType value')
    }

    if (companyName !== undefined && companyName.length > 120) {
        throw new ApiError(400, 'companyName cannot exceed 120 characters')
    }

    if (businessEmail !== undefined && !/^\S+@\S+\.\S+$/.test(businessEmail)) {
        throw new ApiError(400, 'businessEmail must be a valid email')
    }

    if (dateOfBirth && Number.isNaN(parsedDateOfBirth.getTime())) {
        throw new ApiError(400, 'dateOfBirth must be a valid date')
    }

    if (notificationPrefs !== undefined) {
        if (!notificationPrefs || Array.isArray(notificationPrefs) || typeof notificationPrefs !== 'object') {
            throw new ApiError(400, 'notificationPrefs must be an object')
        }

        for (const key of Object.keys(notificationPrefs)) {
            if (!['email', 'sms', 'push'].includes(key) || typeof notificationPrefs[key] !== 'boolean') {
                throw new ApiError(400, 'notificationPrefs may only contain boolean email, sms, and push values')
            }
        }
    }

    if (address !== undefined && (!address || Array.isArray(address) || typeof address !== 'object')) {
        throw new ApiError(400, 'address must be an object')
    }

    if (taxDetails !== undefined && (!taxDetails || Array.isArray(taxDetails) || typeof taxDetails !== 'object')) {
        throw new ApiError(400, 'taxDetails must be an object')
    }

    if (bankDetails !== undefined && (!bankDetails || Array.isArray(bankDetails) || typeof bankDetails !== 'object')) {
        throw new ApiError(400, 'bankDetails must be an object')
    }

    if (isAcceptingBookings !== undefined && typeof isAcceptingBookings !== 'boolean') {
        throw new ApiError(400, 'isAcceptingBookings must be a boolean')
    }

    return {
        name,
        avatarUrl,
        preferredLanguage,
        dateOfBirth: parsedDateOfBirth,
        notificationPrefs,
        displayName,
        ownerType,
        companyName,
        businessEmail,
        businessPhone,
        address,
        taxDetails,
        bankDetails,
        isAcceptingBookings,
    }
}
