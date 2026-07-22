import { asyncHandler } from '../../../../utils/asyncHandler.js'
import { getTenantProfile, updateTenantProfile } from '../services/tenant.service.js'

export const getMyTenantProfile = asyncHandler(async (req, res) => {
    const profile = await getTenantProfile({ user: req.user })

    res.status(200).json({
        success: true,
        data: profile,
    })
})

export const updateMyTenantProfile = asyncHandler(async (req, res) => {
    const profile = await updateTenantProfile({ user: req.user, payload: req.body })

    res.status(200).json({
        success: true,
        message: 'Tenant profile updated successfully',
        data: profile,
    })
})
