import mongoose from 'mongoose'

const tenantProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
            index: true,
        },
        employmentStatus: {
            type: String,
            enum: ['employed', 'self-employed', 'student', 'unemployed', 'retired'],
        },
        occupation: {
            type: String,
            trim: true,
            maxlength: [100, 'Occupation cannot be more than 100 characters'],
        },

        organization: {
            type: String,
            trim: true,
            maxlength: [120, 'Organization cannot be more than 120 characters'],
        },

        currentCity: {
            type: String,
            trim: true,
            maxlength: [100, 'Current city cannot be more than 100 characters'],
        },
        monthlyIncomeRange: {
            type: String,
            trim: true,
            maxlength: [60, 'Monthly income range cannot be more than 60 characters'],
        },
    },
    { timestamps: true }
)

export const TenantProfile =
    mongoose.models.TenantProfile || mongoose.model('TenantProfile', tenantProfileSchema)
