# TrustCore Backend

Professional Express + MongoDB backend for user/admin authentication.

## Folder Structure

```text
src/
  app.js                  # Express app setup, global middleware, routes
  index.js                # Server start point
  config/
    db.js                 # MongoDB connection
    env.js                # Environment variables
  controllers/
    auth.controller.js    # Signup, login, logout, current user
    user.controller.js    # User profile and admin user list
  middlewares/
    auth.middleware.js    # JWT login check and role guard
    error.middleware.js   # Central error response
    notFound.middleware.js
  models/
    user.model.js         # User schema, password hash, safe response
  routes/
    auth.routes.js
    user.routes.js
  utils/
    apiError.js
    asyncHandler.js
    jwt.js
```

## Run

```sh
npm install
copy .env.example .env
npm run dev
```

MongoDB should be running locally, or set `MONGO_URI` to your hosted MongoDB URL.

## Auth Routes

### User signup

`POST /api/auth/signup`

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "password123"
}
```

### Admin signup

`POST /api/auth/admin/signup`

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123",
  "adminSecret": "trustcore-admin-secret"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "rahul@example.com",
  "password": "password123"
}
```

Use the returned token in protected routes:

```text
Authorization: Bearer YOUR_TOKEN
```

## Protected Routes

`GET /api/auth/me` - logged-in user info

`GET /api/users/profile` - logged-in user profile

`GET /api/users` - admin only, returns all users
