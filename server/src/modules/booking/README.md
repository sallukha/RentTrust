# Booking Module (`server/src/modules/booking`)

## Overview
The **Booking Module** manages property viewing appointments and initial rental application requests placed by prospective tenants. It enables scheduling, landlord approvals, schedule conflicts check, and booking status tracking.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/booking/
├── controllers/
│   └── booking.controller.js    # Request handlers for booking scheduling & approval
├── models/
│   └── booking.model.js        # Mongoose Booking Schema
├── routes/
│   └── booking.routes.js        # Express routes (/api/bookings)
├── services/
│   └── booking.service.js       # Business logic (slot checking, landlord notifications)
└── README.md                    # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Create Booking Request (`POST /api/bookings`)**:
   - Tenant selects property and requested date/time slot for property viewing or rental application.
2. **Get User Bookings (`GET /api/bookings`)**:
   - Tenants see their requested viewings.
   - Landlords see viewing requests for their properties.
3. **Update Booking Status (`PATCH /api/bookings/:id/status`)**:
   - Landlords can approve (`confirmed`) or decline (`rejected`) requested viewing slots.
4. **Cancel Booking (`DELETE /api/bookings/:id`)**:
   - Allows tenant or landlord to cancel a scheduled appointment.

---

## Data Model Schema (`booking.model.js`)
```javascript
{
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestedDate: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g. "10:00 AM - 11:00 AM"
  status: { type: String, enum: ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'], default: 'pending' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
}
```

---

## Business Rules & Workflow
- Booking cannot overlap with existing confirmed slots for the same property.
- When status changes to `confirmed`, send automated notification to tenant.
