import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestedDate: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g. "10:00 AM - 11:00 AM"
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'],
      default: 'pending'
    },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 