# TrustCore Rental Marketplace - Server API

Professional Node.js + Express + MongoDB backend using a **Feature-Based Modular MVC Architecture** and fully **Dockerized** infrastructure.

---

## Table of Contents
1. [Architecture & Design Pattern](#architecture--design-pattern)
2. [Folder Structure](#folder-structure)
3. [Modules Overview](#modules-overview)
4. [How to Use & Add New Modules](#how-to-use--add-new-modules)
5. [Dockerization & Deployment](#dockerization--deployment)
6. [Local Development Setup](#local-development-setup)
7. [API Endpoints](#api-endpoints)

---

## Architecture & Design Pattern

This project follows a **Feature-Based Modular MVC Architecture** located under `server/src/modules/`. 

Instead of placing all controllers in a global `controllers/` folder and all models in a global `models/` folder, code is organized by **Domain Feature Modules** (e.g. `auth`, `user`, `property`, `booking`, `lease`, `payment`, `invoice`, `maintenance`, `complaint`, `notification`).

### Why Feature-Based Modular MVC?
- **High Cohesion & Low Coupling**: All files related to a specific domain feature (Model, Controller, Routes, Service, Documentation) live together inside `src/modules/<feature-name>/`.
- **Scalability**: New developers can work on isolated modules without interfering with other features.
- **Maintainability**: Clear separation between Express routing, request handlers (controllers), data schemas (models), and core business logic (services).

---

## Folder Structure

```text
server/
├── Dockerfile                  # Container build instructions
├── .dockerignore               # Docker build ignore file
├── docker-compose.yml          # Multi-container orchestration (API + MongoDB)
├── package.json
├── README.md                   # Server documentation (this file)
└── src/
    ├── app.js                  # Express app configuration & middleware pipeline
    ├── index.js                # Server entry point & DB connection initialization
    ├── config/
    │   ├── db.js               # MongoDB Mongoose connection driver
    │   └── env.js              # Environment variable validator & config loader
    ├── middlewares/
    │   ├── auth.middleware.js  # JWT authentication guard & role authorization
    │   ├── error.middleware.js # Central error handling middleware
    │   └── notFound.middleware.js
    ├── utils/
    │   ├── apiError.js         # Custom HTTP ApiError class
    │   ├── asyncHandler.js     # Wrapper for async Express route handlers
    │   └── jwt.js              # JWT token generator
    └── modules/                # FEATURE MODULES (Modular MVC)
        ├── auth/               # Auth Feature Module
        │   ├── controllers/
        │   ├── models/
        │   ├── routes/
        │   ├── services/
        │   └── README.md
        ├── user/               # User Profile & Admin Feature Module
        │   ├── controllers/
        │   ├── models/
        │   ├── routes/
        │   ├── services/
        │   └── README.md
        ├── property/           # Property Listing Module
        │   └── README.md
        ├── booking/            # Tour & Booking Request Module
        │   └── README.md
        ├── lease/              # Rental Lease Contract Module
        │   └── README.md
        ├── payment/            # Gateway & Transaction Module
        │   └── README.md
        ├── invoice/            # Monthly Rent Billing Module
        │   └── README.md
        ├── maintenance/        # Maintenance Request Ticket Module
        │   └── README.md
        ├── complaint/          # Tenant-Landlord Dispute Module
        │   └── README.md
        └── notification/       # Email & In-App Notification Module
            └── README.md
```

---

## Modules Overview

Inside `server/src/modules/`, every feature directory contains its own **MVC structure** and a dedicated `README.md` specification file detailing planned schema, API routes, controller logic, services, and security rules:

| Module Directory | Primary Responsibilities | Documentation Link |
| :--- | :--- | :--- |
| **`auth`** | User & Admin registration, JWT login, session cookies, password reset | [auth/README.md](./src/modules/auth/README.md) |
| **`user`** | User profiles, account updates, role management, admin user directory | [user/README.md](./src/modules/user/README.md) |
| **`property`** | Property creation, image gallery, amenity selection, search & filters | [property/README.md](./src/modules/property/README.md) |
| **`booking`** | Viewing slot scheduling, tour approval workflow, cancellation | [booking/README.md](./src/modules/booking/README.md) |
| **`lease`** | Lease agreement drafting, term setup, digital signatures, termination | [lease/README.md](./src/modules/lease/README.md) |
| **`payment`** | Rent transaction processing, gateway webhooks (Stripe), receipts | [payment/README.md](./src/modules/payment/README.md) |
| **`invoice`** | Automated monthly rent bills, late fee calculation, PDF downloads | [invoice/README.md](./src/modules/invoice/README.md) |
| **`maintenance`** | Tenant repair tickets, priority levels, contractor assignment | [maintenance/README.md](./src/modules/maintenance/README.md) |
| **`complaint`** | Dispute logging, policy violations, official admin escalations | [complaint/README.md](./src/modules/complaint/README.md) |
| **`notification`** | In-app notification feed, transactional emails, system alerts | [notification/README.md](./src/modules/notification/README.md) |

---

## How to Use & Add New Modules

### Internal MVC Layout of a Feature Module
When implementing or creating a module inside `server/src/modules/<feature-name>`, follow this structure:

```text
src/modules/<feature-name>/
├── controllers/        # Receives req/res, calls service layer, returns HTTP responses
├── models/             # Mongoose schemas & data entity models
├── routes/             # Express routes definition & middleware mounting
├── services/           # Reusable business logic (pure JS / database operations)
└── README.md           # Module specifications & technical design
```

### Steps to Add a New Feature Module:
1. **Create Feature Directory**: Create `server/src/modules/<new-feature>/`.
2. **Define Model**: Create `models/<new-feature>.model.js` defining Mongoose schema.
3. **Define Controller**: Create `controllers/<new-feature>.controller.js` using `asyncHandler`.
4. **Define Service (Optional)**: Move complex queries or third-party logic into `services/<new-feature>.service.js`.
5. **Define Routes**: Create `routes/<new-feature>.routes.js` and mount controllers & auth middlewares (`protect`, `requireRole`).
6. **Mount in `app.js`**:
   ```javascript
   import newFeatureRoutes from './modules/<new-feature>/routes/<new-feature>.routes.js'
   app.use('/api/<new-feature>', newFeatureRoutes)
   ```
7. **Document**: Add `README.md` inside `src/modules/<new-feature>/` describing schemas, APIs, and business rules.

---

## Dockerization & Deployment

The server is fully containerized using **Docker** and **Docker Compose**.

### Option A: Running with Docker Compose (Recommended)
Spins up both the Node.js Express server and a dedicated MongoDB database container in isolated bridge network:

```bash
# Navigate to server directory
cd server

# Build and start containers in detached mode
docker-compose up --build -d

# View server container logs
docker-compose logs -f api

# Stop containers
docker-compose down
```

The API will be available at `http://localhost:5000/api/health`.

### Option B: Building Single Container Image
```bash
# Build Docker image
docker build -t trustcore-server .

# Run container linked to local MongoDB
docker run -p 5000:5000 \
  -e PORT=5000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/trustcore \
  -e JWT_SECRET=your-secret-key \
  trustcore-server
```

---

## Local Development Setup

Without Docker (requires running MongoDB locally):

```bash
# 1. Install dependencies
npm install

# 2. Configure Environment Variables
cp .env.example .env

# 3. Start Development Server with Hot-Reload
npm run dev

# 4. Start Production Server
npm start
```

---

## Auth & User API Endpoints

### Public Auth Endpoints
- `POST /api/auth/signup` - Register a new tenant/user account.
- `POST /api/auth/admin/signup` - Register admin account (requires `adminSecret`).
- `POST /api/auth/login` - User authentication (returns JWT & sets cookie).
- `POST /api/auth/logout` - Clear authentication token cookie.

### Protected User Endpoints
- `GET /api/auth/me` - Get current authenticated user details.
- `GET /api/users/profile` - Get logged-in user profile.
- `GET /api/users` - Admin only: List all registered users.
