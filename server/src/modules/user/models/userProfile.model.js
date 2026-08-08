import mongoose from 'mongoose'

const userProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            trim: true,
            minlength: [2, 'Full name must be at least 2 characters'],
            maxlength: [60, 'Full name cannot be more than 60 characters'],
        },
        avatarUrl: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
        },
        preferredLanguage: {
            type: String,
            default: 'en',
            trim: true,
        },
        notificationPrefs: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
        },
    },
    { timestamps: true }
)

export const UserProfile =
    mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema)
