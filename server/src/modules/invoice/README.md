# Invoice Module (`server/src/modules/invoice`)

## Overview
The **Invoice Module** handles automated creation, distribution, and tracking of monthly rent invoices, utility charges, security deposit bills, and late payment fee calculations.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/invoice/
├── controllers/
│   └── invoice.controller.js    # Invoice list, detail, manually generate, status update
├── models/
│   └── invoice.model.js        # Mongoose Invoice Schema
├── routes/
│   └── invoice.routes.js        # Express routing (/api/invoices)
├── services/
│   └── invoice.service.js       # Billing calculations, PDF generation, cron billing job
└── README.md                    # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Automated Monthly Invoicing**:
   - Background service generates monthly invoices for active leases 5 days before the due date.
2. **List Invoices (`GET /api/invoices`)**:
   - Tenants view due and historical invoices; landlords view tenant billing records.
3. **Get Invoice Details (`GET /api/invoices/:id`)**:
   - Detailed breakdown of rent, utility, tax, and late fees.
4. **Mark Invoice Paid / PDF Export (`GET /api/invoices/:id/pdf`)**:
   - Download downloadable invoice PDF summary for record-keeping.

---

## Data Model Schema (`invoice.model.js`)
```javascript
{
  invoiceNumber: { type: String, required: true, unique: true },
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
  status: { type: String, enum: ['unpaid', 'paid', 'overdue', 'cancelled'], default: 'unpaid' },
  issuedAt: { type: Date, default: Date.now }
}
```
