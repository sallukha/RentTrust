# Complaint Module (`server/src/modules/complaint`)

## Overview
The **Complaint Module** handles dispute logging, tenant-landlord conflict resolution, noise complaints, policy violations, and official administrative escalations.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/complaint/
├── controllers/
│   └── complaint.controller.js  # File complaint, view resolution logs, escalate to admin
├── models/
│   └── complaint.model.js      # Mongoose Complaint Schema
├── routes/
│   └── complaint.routes.js      # Express endpoints (/api/complaints)
├── services/
│   └── complaint.service.js     # Dispute triage & resolution tracking
└── README.md                    # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **File Complaint (`POST /api/complaints`)**:
   - Registered tenants or landlords file grievances (e.g., noise disturbance, unauthorized pets, unpaid rent, property damage).
2. **Track Complaint Status (`GET /api/complaints`)**:
   - Filter by complainant, respondent, or status (`submitted`, `under_review`, `resolved`, `escalated`).
3. **Resolve / Add Resolution Notes (`PATCH /api/complaints/:id/resolve`)**:
   - Landlord or Admin adds resolution details or official warnings.
4. **Admin Escalation (`POST /api/complaints/:id/escalate`)**:
   - Escalates unresolved complaints directly to platform administrators.

---

## Data Model Schema (`complaint.model.js`)
```javascript
{
  complainantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  respondentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  evidenceUrls: [String],
  status: { type: String, enum: ['submitted', 'under_review', 'resolved', 'escalated', 'rejected'], default: 'submitted' },
  resolutionNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
}
```
