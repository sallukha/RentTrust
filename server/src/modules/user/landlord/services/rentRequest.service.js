import { RentRequest } from '../../tenant/models/rentRequest.model.js'
import Property from '../../../property/models/property.model.js'
import { ApiError } from '../../../../utils/apiError.js'

const rentRequestProjection = {
    _id: 1,
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
    frontDocumentUrl: 1,
    backDocumentUrl: 1,
    paystubUrl: 1,
    reason: 1,
    message: 1,
    status: 1,
    createdAt: 1,
    updatedAt: 1,
}

export const getLandlordRentRequests = async ({ user }) => {
    const properties = await Property.find({ landlordId: user._id }).select('_id')
    const propertyIds = properties.map((property) => property._id)

    if (!propertyIds.length) {
        return []
    }

    return RentRequest.find({ propertyId: { $in: propertyIds } })
        .sort({ createdAt: -1 })
        .select(rentRequestProjection)
        .populate('tenantId', 'name email phone')
        .populate('propertyId', 'title address pricePerMonth status')
}

export const updateRentRequestStatus = async ({ user, requestId, status }) => {
    const rentRequest = await RentRequest.findById(requestId).populate('propertyId', 'landlordId')

    if (!rentRequest) {
        throw new ApiError(404, 'Rent request not found')
    }

    const propertyOwnerId = rentRequest.propertyId?.landlordId?.toString?.() || null

    if (!propertyOwnerId || propertyOwnerId !== user._id.toString()) {
        throw new ApiError(403, 'Access denied')
    }

    if (rentRequest.status !== 'pending') {
        throw new ApiError(400, `Cannot update a rent request that is already '${rentRequest.status}'`)
    }

    rentRequest.status = status
    await rentRequest.save()

    return rentRequest
}
