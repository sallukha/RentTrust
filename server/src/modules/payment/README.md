# Payment Module (`server/src/modules/payment`)

## Overview
The **Payment Module** manages financial transactions including rent payments, security deposit collection, online payment gateway integration (Stripe / Razorpay / PayPal), webhook verification, transaction logging, and payment receipts.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/payment/
├── controllers/
│   └── payment.controller.js    # Payment checkout, webhooks, receipt handlers
├── models/
│   └── payment.model.js        # Mongoose Payment Transaction Schema
├── routes/
│   └── payment.routes.js        # Express routing (/api/payments)
├── services/
│   └── payment.service.js       # Payment gateway API calls & webhook handling
└── README.md                    # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Initiate Checkout (`POST /api/payments/checkout`)**:
   - Creates a payment checkout session for a specific invoice or rent payment.
2. **Gateway Webhook Handler (`POST /api/payments/webhook`)**:
   - Listens to payment gateway webhooks (e.g. Stripe `checkout.session.completed`) to verify transactions asynchronously.
3. **Get Payment History (`GET /api/payments`)**:
   - Fetches transaction list for tenant or landlord with filter options.
4. **Get Receipt (`GET /api/payments/:id/receipt`)**:
   - Generates digital receipt details for verified transactions.

---

## Data Model Schema (`payment.model.js`)
```javascript
{
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  leaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lease', required: true },
  payerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  paymentMethod: { type: String, enum: ['stripe', 'card', 'bank_transfer', 'cash'], default: 'stripe' },
  transactionId: { type: String, unique: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  paidAt: { type: Date }
}
```

---

## Security & Reliability
- Verify webhook signatures using gateway secret keys.
- Idempotency checks to prevent duplicate charge processing.
