import { UserProfile } from '../../models/userProfile.model.js'
import { LandlordProfile } from '../models/landlordProfile.model.js'
import { validateLandlordProfileUpdate } from '../validators/landlord.validators.js'

const landlordProfileProjection = {
    _id: 1,
    userId: 1,
    displayName: 1,
    ownerType: 1,
    companyName: 1,
    businessEmail: 1,
    businessPhone: 1,
    address: 1,
    taxDetails: 1,
    bankDetails: 1,
    verificationStatus: 1,
    verificationDocuments: 1,
    totalProperties: 1,
    rating: 1,
    isAcceptingBookings: 1,
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
    const [userProfile, landlordProfile] = await Promise.all([
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
        LandlordProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $setOnInsert: {
                    userId: user._id,
                    displayName: user.name,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: landlordProfileProjection }
        ),
    ])

    return { userProfile, landlordProfile }
}

export const getLandlordProfile = async ({ user }) => {
    const { userProfile, landlordProfile } = await ensureProfiles({ user })

    return {
        account: user.toSafeObject(),
        userProfile,
        landlordProfile,
    }
}

export const updateLandlordProfile = async ({ user, payload }) => {
    const data = validateLandlordProfileUpdate(payload)

    const userProfileSet = {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
        ...(data.preferredLanguage !== undefined ? { preferredLanguage: data.preferredLanguage } : {}),
        ...(data.dateOfBirth !== undefined ? { dateOfBirth: data.dateOfBirth } : {}),
        ...(data.notificationPrefs !== undefined ? { notificationPrefs: data.notificationPrefs } : {}),
    }

    const landlordProfileSet = {
        ...(data.displayName !== undefined ? { displayName: data.displayName } : {}),
        ...(data.ownerType !== undefined ? { ownerType: data.ownerType } : {}),
        ...(data.companyName !== undefined ? { companyName: data.companyName } : {}),
        ...(data.businessEmail !== undefined ? { businessEmail: data.businessEmail } : {}),
        ...(data.businessPhone !== undefined ? { businessPhone: data.businessPhone } : {}),
        ...(data.address !== undefined ? { address: data.address } : {}),
        ...(data.taxDetails !== undefined ? { taxDetails: data.taxDetails } : {}),
        ...(data.bankDetails !== undefined ? { bankDetails: data.bankDetails } : {}),
        ...(data.isAcceptingBookings !== undefined
            ? { isAcceptingBookings: data.isAcceptingBookings }
            : {}),
    }

    const [userProfile, landlordProfile] = await Promise.all([
        UserProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $set: userProfileSet,
                $setOnInsert: {
                    userId: user._id,
                    name: data.name || user.name,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: userProfileProjection }
        ),
        LandlordProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $set: landlordProfileSet,
                $setOnInsert: {
                    userId: user._id,
                    displayName: data.displayName || user.name,
                },
            },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true, projection: landlordProfileProjection }
        ),
    ])

    if (data.name !== undefined && data.name !== user.name) {
        user.name = data.name
        await user.save()
    }

    return {
        account: user.toSafeObject(),
        userProfile,
        landlordProfile,
    }
}
