# Server Project Structure - Feature-Based Organization

## Overview

The server has been reorganized using an **industry-standard feature-based architecture**. This structure improves scalability, maintainability, and code organization by grouping related functionality together.

## Directory Structure

```
server/src/
├── features/                    # Feature modules (business logic)
│   ├── auth/                   # Authentication feature
│   │   ├── auth.controller.js  # Auth request handlers
│   │   └── auth.routes.js      # Auth endpoints
│   └── users/                  # User management feature
│       ├── user.controller.js  # User request handlers
│       ├── user.model.js       # User schema and methods
│       └── user.routes.js      # User endpoints
│
├── shared/                      # Shared utilities and middlewares
│   ├── config/                 # Configuration files
│   │   ├── db.js              # Database connection
│   │   └── env.js             # Environment variables
│   ├── middlewares/            # Global middlewares
│   │   ├── auth.middleware.js # JWT authentication & role protection
│   │   ├── error.middleware.js# Error handling
│   │   └── notFound.middleware.js
│   └── utils/                  # Utility functions
│       ├── apiError.js        # Custom error class
│       ├── asyncHandler.js    # Async error wrapper
│       └── jwt.js             # Token generation
│
├── app.js                      # Express app setup
└── index.js                    # Server entry point

# Old directories (can be deleted after migration):
├── config/     → moved to shared/config/
├── controllers/ → moved to features/*/
├── middlewares/ → moved to shared/middlewares/
├── models/     → moved to features/users/
├── routes/     → moved to features/*/
└── utils/      → moved to shared/utils/
```

## Feature Structure

Each feature follows this pattern:
- **controller.js**: Handles HTTP requests/responses
- **routes.js**: Defines API endpoints
- **model.js** (if needed): Database schema
- **service.js** (optional): Business logic/data access layer

### Example: Auth Feature
```
features/auth/
├── auth.controller.js   # signup, login, logout, getMe
└── auth.routes.js       # POST /signup, /login, etc.
```

### Example: Users Feature
```
features/users/
├── user.controller.js   # getAllUsers, getUserProfile
├── user.routes.js       # GET /profile, GET /
└── user.model.js        # User schema & methods
```

## Benefits of This Structure

✅ **Scalability**: New features can be added as independent modules
✅ **Maintainability**: Related code is co-located, easier to find
✅ **Testability**: Features are isolated and testable units
✅ **Reusability**: Shared utilities are centralized
✅ **Team Collaboration**: Clear ownership of features

## Adding a New Feature

To add a new feature (e.g., `properties`):

1. Create `src/features/properties/` directory
2. Add files:
   ```
   src/features/properties/
   ├── property.controller.js
   ├── property.routes.js
   ├── property.model.js
   └── property.service.js (optional)
   ```
3. Import routes in `src/app.js`:
   ```javascript
   import propertyRoutes from './features/properties/property.routes.js'
   app.use('/api/properties', propertyRoutes)
   ```

## Migration Notes

All imports have been updated to reflect the new paths:
- Middleware imports updated in feature routes
- Database config import updated in index.js
- App.js imports updated to use new feature paths

Old directories remain for reference but can be safely deleted once you verify everything works.

## Next Steps

1. Test the server: `npm start` or your test command
2. Verify all routes work as expected
3. Delete old directories when migration is complete:
   ```bash
   rm -rf src/config src/controllers src/middlewares src/models src/routes src/utils
   ```
