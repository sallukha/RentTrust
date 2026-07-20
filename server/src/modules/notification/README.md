# Notification Module (`server/src/modules/notification`)

## Overview
The **Notification Module** handles in-app notifications, transactional email triggers, payment reminders, booking alerts, maintenance updates, and system-wide announcements.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/notification/
├── controllers/
│   └── notification.controller.js  # Read/unread status handlers, list notifications
├── models/
│   └── notification.model.js      # Mongoose Notification Schema
├── routes/
│   └── notification.routes.js      # Express routing (/api/notifications)
├── services/
│   └── notification.service.js     # Dispatch logic (In-app, Email / Nodemailer, Webhooks)
└── README.md                       # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Get User Notifications (`GET /api/notifications`)**:
   - Lists notifications for logged-in user with pagination and read/unread count.
2. **Mark Notification Read (`PATCH /api/notifications/:id/read`)**:
   - Updates `isRead: true` for a single notification.
3. **Mark All Read (`PATCH /api/notifications/read-all`)**:
   - Marks all notifications as read for current user.
4. **Send System Notification (`POST /api/notifications/system`)**:
   - Restricted to `admin` role for platform broadcast messages.

---

## Data Model Schema (`notification.model.js`)
```javascript
{
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['rent_due', 'payment_received', 'booking_update', 'maintenance_update', 'lease_signed', 'system'], default: 'system' },
  isRead: { type: Boolean, default: false },
  linkUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
}
```
