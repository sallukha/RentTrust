# Maintenance Module (`server/src/modules/maintenance`)

## Overview
The **Maintenance Module** manages tenant repair requests, maintenance tickets, contractor assignment, emergency urgency tags, photo attachments, and repair progress tracking.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/maintenance/
├── controllers/
│   └── maintenance.controller.js  # Ticket submission, status updates, contractor assignment
├── models/
│   └── maintenance.model.js      # Mongoose Maintenance Request Schema
├── routes/
│   └── maintenance.routes.js      # Express routing (/api/maintenance)
├── services/
│   └── maintenance.service.js     # Ticket lifecycle management & notification alerts
└── README.md                      # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Submit Repair Ticket (`POST /api/maintenance`)**:
   - Tenants report issues (plumbing, electrical, HVAC, structural) with descriptions and photos.
2. **List Maintenance Tickets (`GET /api/maintenance`)**:
   - Filterable by property, status (`open`, `in_progress`, `resolved`), and priority (`low`, `medium`, `high`, `urgent`).
3. **Update Ticket Status (`PATCH /api/maintenance/:id/status`)**:
   - Landlords update progress or mark issues resolved upon repair verification.
4. **Assign Contractor / Service Worker (`PATCH /api/maintenance/:id/assign`)**:
   - Landlords assign external technicians or internal staff to resolve issues.

---

## Data Model Schema (`maintenance.model.js`)
```javascript
{
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'other'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
  images: [String],
  assignedContractor: {
    name: String,
    phone: String
  },
  createdAt: { type: Date, default: Date.now }
}
```
