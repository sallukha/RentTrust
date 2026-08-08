import { ApiError } from '../../../../utils/apiError.js'

const ALLOWED_TENANT_TYPES = new Set([
    'BACHELOR',
    'FAMILY',
    'WORKING_PROFESSIONAL',
    'STUDENT',
])

const ALLOWED_DURATIONS = new Set([6, 11, 12])

export const validateRentRequestPayload = (payload) => {
    const propertyId = String(payload?.propertyId || '').trim()
    const moveInDate = String(payload?.moveInDate || '').trim()
    const durationMonths = Number(payload?.durationMonths)
    const occupants = Number(payload?.occupants)
    const familyType = String(payload?.familyType || payload?.tenantType || '').trim()
    const currentCity = payload?.currentCity ? String(payload.currentCity).trim() : ''
    const pets = Boolean(payload?.pets)
    const occupation = String(payload?.occupation || '').trim()
    const organization = payload?.organization ? String(payload.organization).trim() : ''
    const monthlyIncome = payload?.monthlyIncome !== undefined && payload?.monthlyIncome !== null
        ? Number(payload.monthlyIncome)
        : undefined
    const reason = payload?.reason ? String(payload.reason).trim() : ''
    const message = String(payload?.message || '').trim()

    if (!propertyId) {
        throw new ApiError(400, 'propertyId is required')
    }

    if (!moveInDate) {
        throw new ApiError(400, 'moveInDate is required')
    }

    const parsedMoveInDate = new Date(moveInDate)
    if (Number.isNaN(parsedMoveInDate.getTime())) {
        throw new ApiError(400, 'moveInDate must be a valid date')
    }

    if (!Number.isInteger(durationMonths) || durationMonths < 1) {
        throw new ApiError(400, 'durationMonths must be a positive integer')
    }

    if (!ALLOWED_DURATIONS.has(durationMonths)) {
        throw new ApiError(400, 'durationMonths must be 6, 11, or 12 months')
    }

    if (!Number.isInteger(occupants) || occupants < 1) {
        throw new ApiError(400, 'occupants must be a positive integer')
    }

    if (!ALLOWED_TENANT_TYPES.has(familyType)) {
        throw new ApiError(400, 'Invalid familyType value')
    }

    if (!occupation) {
        throw new ApiError(400, 'occupation is required')
    }

    if (!message) {
        throw new ApiError(400, 'message is required')
    }

    if (message.length > 500) {
        throw new ApiError(400, 'message cannot exceed 500 characters')
    }

    if (monthlyIncome !== undefined && (Number.isNaN(monthlyIncome) || monthlyIncome < 0)) {
        throw new ApiError(400, 'monthlyIncome must be a valid non-negative number')
    }

    return {
        propertyId,
        moveInDate: parsedMoveInDate,
        durationMonths,
        occupants,
        familyType,
        currentCity: currentCity || undefined,
        pets,
        occupation,
        organization: organization || undefined,
        monthlyIncome,
        reason: reason || undefined,
        message,
    }
}
