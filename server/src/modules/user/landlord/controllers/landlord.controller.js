import { asyncHandler } from '../../../../utils/asyncHandler.js'
import { getLandlordProfile, updateLandlordProfile } from '../services/landlord.service.js'

export const getMyLandlordProfile = asyncHandler(async (req, res) => {
    const profile = await getLandlordProfile({ user: req.user })

    res.status(200).json({
        success: true,
        data: profile,
    })
})

export const updateMyLandlordProfile = asyncHandler(async (req, res) => {
    const profile = await updateLandlordProfile({ user: req.user, payload: req.body })

    res.status(200).json({
        success: true,
        message: 'Landlord profile updated successfully',
        data: profile,
    })
})
