# Lease Module (`server/src/modules/lease`)

## Overview
The **Lease Module** manages legal rental contracts between landlords and tenants. It includes lease agreement creation, term configuration (rent, deposit, start/end dates), digital signatures, renewal requests, and contract termination.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/lease/
├── controllers/
│   └── lease.controller.js      # Handlers for lease creation, signing, and renewal
├── models/
│   └── lease.model.js          # Mongoose Lease Schema
├── routes/
│   └── lease.routes.js          # Express endpoints (/api/leases)
├── services/
│   └── lease.service.js         # Business logic for active contracts & status lifecycle
└── README.md                    # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Create Lease Draft (`POST /api/leases`)**:
   - Landlord creates a rental agreement for a tenant specifying rent amount, security deposit, start & end dates, and terms.
2. **Sign Lease (`POST /api/leases/:id/sign`)**:
   - Tenant or Landlord records their digital signature and timestamp.
3. **Get Active Leases (`GET /api/leases`)**:
   - Users view active, draft, or past leases associated with their account.
4. **Terminate / Renew Lease (`PATCH /api/leases/:id/status`)**:
   - Handles lease termination, notice periods, or renewal agreements.

---

## Data Model Schema (`lease.model.js`)
```javascript
{
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  monthlyRent: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  termsAndConditions: { type: String, required: true },
  status: { type: String, enum: ['draft', 'pending_signatures', 'active', 'expired', 'terminated'], default: 'draft' },
  landlordSigned: { type: Boolean, default: false },
  tenantSigned: { type: Boolean, default: false },
  signedAt: { type: Date }
}
```

---

## Business Logic
- Property status automatically updates to `rented` once both parties sign the lease agreement (`status: 'active'`).
- Automated monthly invoice generation is linked to active lease contracts.
