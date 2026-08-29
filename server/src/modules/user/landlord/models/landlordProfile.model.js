import mongoose from 'mongoose'

const landlordProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
            index: true,
        },
        displayName: {
            type: String,
            trim: true,
            minlength: [2, 'Display name must be at least 2 characters'],
            maxlength: [80, 'Display name cannot be more than 80 characters'],
        },
        ownerType: {
            type: String,
            enum: ['individual', 'company', 'agent'],
            default: 'individual',
        },
        companyName: {
            type: String,
            trim: true,
            maxlength: [120, 'Company name cannot be more than 120 characters'],
        },
        businessEmail: {
            type: String,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid business email'],
        },
        businessPhone: {
            type: String,
            trim: true,
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true, maxlength: [100, 'City cannot be more than 100 characters'] },
            state: { type: String, trim: true, maxlength: [100, 'State cannot be more than 100 characters'] },
            zipCode: { type: String, trim: true },
            country: { type: String, trim: true, default: 'India' },
        },
        taxDetails: {
            panNumber: {
                type: String,
                uppercase: true,
                trim: true,
                match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Please provide a valid PAN number'],
            },
            gstNumber: {
                type: String,
                uppercase: true,
                trim: true,
                maxlength: [15, 'GST number cannot be more than 15 characters'],
            },
        },
        bankDetails: {
            accountHolderName: { type: String, trim: true },
            accountNumberLast4: {
                type: String,
                trim: true,
                match: [/^\d{4}$/, 'Account number last 4 must contain 4 digits'],
            },
            ifscCode: {
                type: String,
                uppercase: true,
                trim: true,
                match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please provide a valid IFSC code'],
            },
        },
        verificationStatus: {
            type: String,
            enum: ['pending', 'verified', 'rejected'],
            default: 'pending',
            index: true,
        },
        verificationDocuments: {
            idProofUrl: { type: String, trim: true },
            addressProofUrl: { type: String, trim: true },
            ownershipProofUrls: [{ type: String, trim: true }],
        },
        totalProperties: {
            type: Number,
            default: 0,
            min: [0, 'Total properties cannot be negative'],
        },
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be more than 5'],
        },
        isAcceptingBookings: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

landlordProfileSchema.index({ ownerType: 1, verificationStatus: 1 })
landlordProfileSchema.index({ 'address.city': 1 })

export const LandlordProfile =
    mongoose.models.LandlordProfile || mongoose.model('LandlordProfile', landlordProfileSchema)
