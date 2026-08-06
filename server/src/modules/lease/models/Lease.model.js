import mongoose from 'mongoose';
const leaseSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    monthlyRent: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    termsAndConditions: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'pending_signatures', 'active', 'expired', 'terminated'],
      default: 'draft'
    },
    landlordSigned: { type: Boolean, default: false },
    tenantSigned: { type: Boolean, default: false },
    signedAt: { type: Date }
  },
  { timestamps: true }
);
const Lease = mongoose.models.Lease || mongoose.model('Lease', leaseSchema);
export default Lease;
