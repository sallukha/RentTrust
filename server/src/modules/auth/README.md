# Auth Module (`server/src/modules/auth`)

## Overview
The **Auth Module** handles user authentication, authorization, session management, token issuance (JWT), role-based access control (RBAC), and security procedures (password hashing, reset tokens, and admin secret verification).

---

## Folder Structure (Modular MVC)
```text
server/src/modules/auth/
├── controllers/
│   └── auth.controller.js      # Express request handlers (signup, login, logout, me)
├── models/
│   └── refreshToken.model.js   # (Optional) Refresh token whitelist/blacklisting
├── routes/
│   └── auth.routes.js          # Route paths & HTTP methods mapped to controllers
├── services/
│   └── auth.service.js         # Core business logic & password/token handling
├── middlewares/
│   └── auth.middleware.js      # JWT verify & admin authorization guard
└── README.md                   # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **User Signup (`POST /api/auth/signup`)**:
   - Accepts `name`, `email`, `password`.
   - Hashes password using bcrypt (10 rounds).
   - Generates JWT token and sets HTTP-only cookie or returns auth header.
2. **Admin Registration (`POST /api/auth/admin/signup`)**:
   - Validates secret key `adminSecret` from environment config.
   - Assigns `role: 'admin'` upon successful validation.
3. **User Login (`POST /api/auth/login`)**:
   - Validates email and compares hashed passwords.
   - Returns sanitized user profile and access token.
4. **Logout (`POST /api/auth/logout`)**:
   - Clears cookie and invalidates session token.
5. **Get Current User (`GET /api/auth/me`)**:
   - Protected endpoint returning currently logged-in user profile.

---

## Data Model / Entity Specs
Uses `User` entity from `user` module with security fields:
- `email` (String, Required, Unique, Lowercase)
- `password` (String, Required, Min length 6, Hashed)
- `role` (String, Enum: `['tenant', 'landlord', 'admin']`, Default: `'tenant'`)
- `isVerified` (Boolean, Default: false)

---

## Security & Best Practices
- **Password Security**: Never store plain-text passwords. Sanitize passwords from all API responses.
- **JWT Protection**: Tokens signed with `JWT_SECRET` and configurable expiration (`JWT_EXPIRES_IN`).
- **HTTP Cookies**: Uses `httpOnly: true`, `sameSite: strict`, and `secure: true` in production.
