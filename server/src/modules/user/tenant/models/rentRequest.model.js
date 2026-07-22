import mongoose from 'mongoose'

const rentRequestSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
            index: true,
        },
        moveInDate: {
            type: Date,
            required: true,
        },
        durationMonths: {
            type: Number,
            required: true,
            min: 1,
        },
        occupants: {
            type: Number,
            required: true,
            min: 1,
        },
        familyType: {
            type: String,
            enum: ['BACHELOR', 'FAMILY', 'STUDENT', 'WORKING_PROFESSIONAL'],
            default: 'BACHELOR',
        },
        pets: {
            type: Boolean,
            default: false,
        },

        monthlyIncome: {
            type: Number,
            min: 0,
        },
        reason: {
            type: String,
            trim: true,
            maxlength: [120, 'Reason cannot be more than 120 characters'],
        },
        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: [500, 'Message cannot exceed 500 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true }
)

rentRequestSchema.index({ tenantId: 1, createdAt: -1 })

export const RentRequest =
    mongoose.models.RentRequest || mongoose.model('RentRequest', rentRequestSchema)
