# RentTrust (TrustCore Rental Marketplace)

A modern, high-trust Rental Marketplace platform architecture built with Node.js, Express, MongoDB, and React.

---

## Workspace Structure

```text
RentTrust/
├── docker-compose.yml          # Root multi-service Docker Orchestration (API + MongoDB)
├── client/                     # Frontend client application
└── server/                     # Backend Express API Service
    ├── Dockerfile              # Production multi-stage Docker build
    ├── docker-compose.yml      # Standalone Server Docker Compose
    ├── README.md               # Detailed Server Documentation
    └── src/
        ├── app.js              # Express app setup & route registration
        ├── index.js            # Entry point & DB connection startup
        ├── config/             # DB & Environment Configuration
        ├── middlewares/        # Authentication guards & error handlers
        ├── utils/              # Helper utilities (JWT, ApiError, AsyncHandler)
        └── modules/            # FEATURE-BASED MODULAR MVC ARCHITECTURE
            ├── auth/           # Authentication & Security Module
            ├── user/           # User Management & Profiles Module
            ├── property/       # Property Listing & Search Module
            ├── booking/        # Tour & Booking Request Module
            ├── lease/          # Legal Rental Lease Contract Module
            ├── payment/        # Payment Processing & Gateways Module
            ├── invoice/        # Rent Invoicing & Billing Module
            ├── maintenance/    # Maintenance Request Ticket Module
            ├── complaint/      # Dispute & Resolution Module
            └── notification/   # In-App & Email Notifications Module
```

---

## 1. Feature Folder & Modular MVC Architecture

In `server/src/modules/`, every domain feature is structured using a **Modular MVC Pattern**:

```text
server/src/modules/<feature-name>/
├── controllers/        # Request handlers & HTTP responses (<feature>.controller.js)
├── models/             # Mongoose schemas & data models (<feature>.model.js)
├── routes/             # Express endpoints & middleware guards (<feature>.routes.js)
├── services/           # Reusable core business logic (<feature>.service.js)
└── README.md           # Technical documentation & feature design specs
```

### Module Documentation Specs (`server/src/modules/*/README.md`)
Every module contains a dedicated `README.md` explaining:
- **Module Purpose**: Core responsibility of the feature.
- **Folder Breakdown**: Internal MVC files.
- **Key Features**: API functionalities.
- **Data Models**: Mongoose schemas and data fields.
- **Business Logic & Security**: Authorization rules, validation, and workflows.

---

## 2. Dockerization

The backend service is fully Dockerized for containerized deployment.

### Quick Start with Docker Compose (Root)
To launch the backend Express server alongside a MongoDB database:

```bash
# Build and run containers
docker-compose up --build -d

# Check running containers
docker-compose ps

# View backend server logs
docker-compose logs -f server

# Stop containers
docker-compose down
```

The server will be live at: `http://localhost:5000/api/health`.

---

## 3. Local Development (Without Docker)

```bash
# 1. Enter server folder
cd server

# 2. Install dependencies
npm install

# 3. Setup Environment File
cp .env.example .env

# 4. Start Development Server
npm run dev
```
