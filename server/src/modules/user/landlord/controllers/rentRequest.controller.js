import { asyncHandler } from '../../../../utils/asyncHandler.js'
import { ApiError } from '../../../../utils/apiError.js'
import {
    getLandlordRentRequests,
    updateRentRequestStatus,
} from '../services/rentRequest.service.js'

export const listLandlordRentRequests = asyncHandler(async (req, res) => {
    const rentRequests = await getLandlordRentRequests({ user: req.user })

    res.status(200).json({
        success: true,
        data: {
            rentRequests,
        },
    })
})

export const updateRentRequestStatusByLandlord = asyncHandler(async (req, res) => {
    const { status } = req.body

    if (!status || !['approved', 'rejected'].includes(status)) {
        throw new ApiError(400, "Status must be either 'approved' or 'rejected'")
    }

    const rentRequest = await updateRentRequestStatus({
        user: req.user,
        requestId: req.params.id,
        status,
    })

    res.status(200).json({
        success: true,
        message: `Rent request ${status} successfully`,
        data: {
            rentRequest,
        },
    })
})
