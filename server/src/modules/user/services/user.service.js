import { UserProfile } from '../models/userProfile.model.js'
import { TenantProfile } from '../tenant/models/tenantProfile.model.js'
// import { LandlordProfile } from '../models/landlordProfile.model.js'

export const createUserProfiles = async ({ user }) => {
    const userProfile = await UserProfile.create({
        userId: user._id,
        name: user.name,
    })

    user.profileId = userProfile._id

    if (user.role === 'tenant') {
        const tenantProfile = await TenantProfile.create({
            userId: user._id,
        })

        user.tenantProfileId = tenantProfile._id;
    }

    if (user.role === 'landlord') {
        const landlordProfile = await LandlordProfile.create({
            userId: user._id,
        })

        user.landlordProfileId = landlordProfile._id
    }

    await user.save()

    return user
}
