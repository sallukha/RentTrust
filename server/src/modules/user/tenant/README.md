# Tenant Module

This module contains tenant-only APIs and business logic.

## Folder Structure
- controllers/
- services/
- routes/
- validators/
- models/

## Current Endpoints
- GET /api/tenant/profile
- PATCH /api/tenant/profile
- POST /api/tenant/rent-requests
- GET /api/tenant/rent-requests

## Profile completion

Tenant registration creates an intentionally incomplete profile. Complete it with
`PATCH /api/tenant/profile` using any combination of:

```json
{
  "name": "Ritik Kumar",
  "avatarUrl": "https://example.com/avatar.jpg",
  "dateOfBirth": "2000-05-10",
  "preferredLanguage": "en",
  "notificationPrefs": { "email": true, "sms": false, "push": true },
  "employmentStatus": "employed",
  "occupation": "Software Engineer",
  "organization": "Example Labs",
  "currentCity": "Bengaluru",
  "monthlyIncomeRange": "50000-75000"
}
```

KYC is not part of the tenant profile at this time.
