import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    complainantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    respondentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    evidenceUrls: [String],
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'resolved', 'escalated', 'rejected'],
      default: 'submitted'
    },
    resolutionNotes: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

complaintSchema.index({ complainantId: 1, status: 1 });
complaintSchema.index({ respondentId: 1, status: 1 });

const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);

export default Complaint;
