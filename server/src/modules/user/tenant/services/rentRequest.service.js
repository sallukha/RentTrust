import { RentRequest } from '../models/rentRequest.model.js'
import { validateRentRequestPayload } from '../validators/rentRequest.validators.js'

const rentRequestProjection = {
    tenantId: 1,
    propertyId: 1,
    moveInDate: 1,
    durationMonths: 1,
    occupants: 1,
    familyType: 1,
    currentCity: 1,
    pets: 1,
    occupation: 1,
    organization: 1,
    monthlyIncome: 1,
    reason: 1,
    message: 1,
    status: 1,
    createdAt: 1,
    updatedAt: 1,
}

export const createRentRequest = async ({ user, payload }) => {
    const data = validateRentRequestPayload(payload)

    const rentRequest = await RentRequest.create({
        tenantId: user._id,
        ...data,
    })

    return rentRequest
}

export const getMyRentRequests = async ({ user }) => {
    const rentRequests = await RentRequest.find({ tenantId: user._id })
        .sort({ createdAt: -1 })
        .select(rentRequestProjection)

    return rentRequests
}
