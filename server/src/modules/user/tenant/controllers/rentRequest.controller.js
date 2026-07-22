import { asyncHandler } from '../../../../utils/asyncHandler.js'
import { createRentRequest, getMyRentRequests } from '../services/rentRequest.service.js'

export const createMyRentRequest = asyncHandler(async (req, res) => {
    const rentRequest = await createRentRequest({ user: req.user, payload: req.body })

    res.status(201).json({
        success: true,
        message: 'Rent request submitted successfully',
        data: {
            rentRequest,
        },
    })
})

export const listMyRentRequests = asyncHandler(async (req, res) => {
    const rentRequests = await getMyRentRequests({ user: req.user })

    res.status(200).json({
        success: true,
        count: rentRequests.length,
        data: {
            rentRequests,
        },
    })
})
