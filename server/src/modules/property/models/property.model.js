import mongoose from 'mongoose';
const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    pricePerMonth: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    amenities: [String],  
    images: [String],
    status: {
      type: String,
      enum: ['available', 'rented', 'maintenance', 'inactive'],
      default: 'available'
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

propertySchema.index({ 'address.city': 1, pricePerMonth: 1, bedrooms: 1, status: 1 });
const Property = mongoose.model('Property', propertySchema);
export default Property;


 