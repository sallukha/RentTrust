# User Module (`server/src/modules/user`)

## Overview
The **User Module** manages user profile information, tenant & landlord account details, role assignments, user status updates, and administrative management of registered platform accounts.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/user/
├── controllers/
│   └── user.controller.js      # Handlers for profiles, listings, and admin operations
├── models/
│   └── user.model.js           # Mongoose schema for User entity
├── routes/
│   └── user.routes.js          # User endpoints (Profile update, Admin user list)
├── services/
│   └── user.service.js         # Business logic for user account management
└── README.md                   # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **Get User Profile (`GET /api/users/profile`)**:
   - Fetches the profile of the authenticated tenant, landlord, or admin.
2. **Update Profile (`PUT /api/users/profile`)**:
   - Allows users to update personal details (`name`, `phone`, `avatar`, `address`).
3. **Change Password (`PATCH /api/users/change-password`)**:
   - Allows authenticated users to change password by verifying the old password.
4. **Admin - Get All Users (`GET /api/users`)**:
   - Protected endpoint for admins to list, search, filter, and paginate users.
5. **Admin - Update Role/Status (`PATCH /api/users/:id/status`)**:
   - Allows admins to change user role (`tenant`, `landlord`, `admin`) or suspend accounts.

---

## Data Model Schema (`user.model.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['tenant', 'landlord', 'admin'], default: 'tenant' },
  phone: { type: String },
  avatarUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}
```

---

## Access Control
- `/api/users/profile`: Authenticated users (`tenant`, `landlord`, `admin`).
- `/api/users`: `admin` only.
