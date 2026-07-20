# Property Module (`server/src/modules/property`)

## Overview
The **Property Module** handles property creation, listing, searching, filtering, and management by landlords. It stores property metadata, address/location, rental pricing, available amenities, and availability status.

---

## Folder Structure (Modular MVC)
```text
server/src/modules/property/
├── controllers/
│   └── property.controller.js    # Request handlers (create, search, update, delete)
├── models/
│   └── property.model.js        # Mongoose Property Schema
├── routes/
│   └── property.routes.js        # API Routes (/api/properties)
├── services/
│   └── property.service.js       # Business logic (search, filter, landlord validation)
└── README.md                     # Module documentation (this file)
```

---

## Key Features & Responsibilities
1. **List & Search Properties (`GET /api/properties`)**:
   - Public/authenticated search by location, price range, bedrooms, property type, and availability.
2. **Get Single Property (`GET /api/properties/:id`)**:
   - Retrieves full details, images, landlord details, and active rental status.
3. **Create Property Listing (`POST /api/properties`)**:
   - Restricted to `landlord` and `admin` roles.
   - Accepts title, description, address, pricePerMonth, depositAmount, amenities, and image uploads.
4. **Update Property (`PUT /api/properties/:id`)**:
   - Allows property owner (landlord) or admin to update details or availability status.
5. **Delete Property (`DELETE /api/properties/:id`)**:
   - Allows owner or admin to archive/delete a property listing.

---

## Data Model Schema (`property.model.js`)
```javascript
{
  title: { type: String, required: true },
  description: { type: String },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  pricePerMonth: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  amenities: [String], // e.g. ["Parking", "WiFi", "Gym", "Air Conditioning"]
  images: [String],
  status: { type: String, enum: ['available', 'rented', 'maintenance', 'inactive'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
}
```

---

## Authorization & Rules
- Any visitor or user can view available properties.
- Only users with `landlord` or `admin` role can create properties.
- Landlords can only edit/delete properties that belong to them (`landlordId === req.user.id`).
