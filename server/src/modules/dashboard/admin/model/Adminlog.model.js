import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },  
    targetType: {
      type: String,
      enum: ['Property', 'Booking', 'Invoice', 'Lease', 'Maintenance', 'Complaint', 'User'],
      required: true
    },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

adminLogSchema.index({ adminId: 1, createdAt: -1 });
adminLogSchema.index({ targetType: 1, targetId: 1 });

const AdminLog = mongoose.models.AdminLog || mongoose.model('AdminLog', adminLogSchema);

export default AdminLog;
