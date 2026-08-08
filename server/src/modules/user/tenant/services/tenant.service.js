import { UserProfile } from '../../models/userProfile.model.js'
import { TenantProfile } from '../models/tenantProfile.model.js'
import { validateTenantProfileUpdate } from '../validators/tenant.validators.js'

const tenantProfileProjection = {
    _id: 1,
    userId: 1,
    employmentStatus: 1,
    monthlyIncomeRange: 1,
    occupation: 1,
    organization: 1,
    currentCity: 1,
    createdAt: 1,
    updatedAt: 1,
}

const userProfileProjection = {
    _id: 1,
    userId: 1,
    name: 1,
    avatarUrl: 1,
    dateOfBirth: 1,
    preferredLanguage: 1,
    notificationPrefs: 1,
    createdAt: 1,
    updatedAt: 1,
}

const ensureProfiles = async ({ user }) => {
    const [userProfile, tenantProfile] = await Promise.all([
        UserProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $setOnInsert: {
                    userId: user._id,
                    name: user.name,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: userProfileProjection }
        ),
        TenantProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $setOnInsert: {
                    userId: user._id,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: tenantProfileProjection }
        ),
    ])

    return { userProfile, tenantProfile }
}

export const getTenantProfile = async ({ user }) => {
    const { userProfile, tenantProfile } = await ensureProfiles({ user })

    return {
        account: user.toSafeObject(),
        userProfile,
        tenantProfile,
    }
}

export const updateTenantProfile = async ({ user, payload }) => {
    const data = validateTenantProfileUpdate(payload)

    const [userProfile, tenantProfile] = await Promise.all([
        UserProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $set: {
                    ...(data.name !== undefined ? { name: data.name } : {}),
                    ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
                    ...(data.preferredLanguage !== undefined
                        ? { preferredLanguage: data.preferredLanguage }
                        : {}),
                    ...(data.dateOfBirth !== undefined ? { dateOfBirth: data.dateOfBirth } : {}),
                    ...(data.notificationPrefs !== undefined
                        ? { notificationPrefs: data.notificationPrefs }
                        : {}),
                },
                $setOnInsert: {
                    userId: user._id,
                    name: data.name || user.name,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: userProfileProjection }
        ),
        TenantProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $set: {
                    ...(data.employmentStatus !== undefined
                        ? { employmentStatus: data.employmentStatus }
                        : {}),
                    ...(data.monthlyIncomeRange !== undefined
                        ? { monthlyIncomeRange: data.monthlyIncomeRange }
                        : {}),
                    ...(data.occupation !== undefined ? { occupation: data.occupation } : {}),
                    ...(data.organization !== undefined ? { organization: data.organization } : {}),
                    ...(data.currentCity !== undefined ? { currentCity: data.currentCity } : {}),
                },
                $setOnInsert: {
                    userId: user._id,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: tenantProfileProjection }
        ),
    ])

    if (data.name !== undefined && data.name !== user.name) {
        user.name = data.name
        await user.save()
    }

    return {
        account: user.toSafeObject(),
        userProfile,
        tenantProfile,
    }
}
