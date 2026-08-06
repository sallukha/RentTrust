import mongoose from 'mongoose'
const invoiceSchema = new  mongoose.Schema({
 invoiceNumber: 
 { type: String, required: true, unique: true },
    leaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lease', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amountDue: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    lineItems: [
      {
        description: String,
        amount: Number
      }
    ],
    status: {
      type: String,
      enum: ['unpaid', 'paid', 'overdue', 'cancelled'],
      default: 'unpaid'
    },
    issuedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema)
export default Invoice

