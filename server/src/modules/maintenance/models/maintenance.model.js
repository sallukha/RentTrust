import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
      type: String,
      enum: ['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'other'],
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open'
    },
    images: [String],
    assignedContractor: {
      name: String,
      phone: String
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Speeds up the common filter combos (property + status + priority)
maintenanceSchema.index({ propertyId: 1, status: 1, priority: 1 });

const Maintenance = mongoose.model('maintenance', maintenanceSchema);

export default Maintenance;