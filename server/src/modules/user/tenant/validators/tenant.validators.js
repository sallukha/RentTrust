import { ApiError } from '../../../../utils/apiError.js'

const ALLOWED_EMPLOYMENT_STATUS = new Set([
    'employed',
    'self-employed',
    'student',
    'unemployed',
    'retired',
])

export const validateTenantProfileUpdate = (payload) => {
    const name = payload?.name ? String(payload.name).trim() : undefined
    const avatarUrl = payload?.avatarUrl ? String(payload.avatarUrl).trim() : undefined
    const preferredLanguage = payload?.preferredLanguage
        ? String(payload.preferredLanguage).trim()
        : undefined
    const monthlyIncomeRange = payload?.monthlyIncomeRange
        ? String(payload.monthlyIncomeRange).trim()
        : undefined
    const employmentStatus = payload?.employmentStatus
        ? String(payload.employmentStatus).trim()
        : undefined
    const occupation = payload?.occupation ? String(payload.occupation).trim() : undefined
    const organization = payload?.organization ? String(payload.organization).trim() : undefined
    const currentCity = payload?.currentCity ? String(payload.currentCity).trim() : undefined
    const dateOfBirth = payload?.dateOfBirth ? String(payload.dateOfBirth).trim() : undefined
    const notificationPrefs = payload?.notificationPrefs
    const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined

    if (name !== undefined && (name.length < 2 || name.length > 60)) {
        throw new ApiError(400, 'name must be between 2 and 60 characters')
    }

    if (employmentStatus !== undefined && !ALLOWED_EMPLOYMENT_STATUS.has(employmentStatus)) {
        throw new ApiError(400, 'Invalid employmentStatus value')
    }

    if (occupation !== undefined && occupation.length > 100) {
        throw new ApiError(400, 'occupation cannot exceed 100 characters')
    }

    if (organization !== undefined && organization.length > 120) {
        throw new ApiError(400, 'organization cannot exceed 120 characters')
    }

    if (currentCity !== undefined && currentCity.length > 100) {
        throw new ApiError(400, 'currentCity cannot exceed 100 characters')
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

    return {
        name,
        avatarUrl,
        preferredLanguage,
        monthlyIncomeRange,
        employmentStatus,
        occupation,
        organization,
        currentCity,
        dateOfBirth: parsedDateOfBirth,
        notificationPrefs,
    }
}
