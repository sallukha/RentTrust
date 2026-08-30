import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/routes/auth.routes.js'
import userRoutes from './modules/user/routes/user.routes.js'
import tenantRoutes from './modules/user/tenant/routes/tenant.routes.js'
import landlordRoutes from './modules/user/landlord/routes/landlord.routes.js'
import adminAuthRoutes from './modules/user/admin/routes/adminAuth.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { notFound } from './middlewares/notFound.middleware.js'
import invoiceRoutes from "./modules/invoice/routes/Invoice.routes.js"
import bookingRoutes from "./modules/booking/routes/booking.routes.js"
import propertyRoutes from "./modules/property/routes/property.routes.js"
import leaseRoutes from "./modules/lease/routes/Lease.routes.js"
import complaintRoutes from "./modules/complaint/routes/complaint.routes.js"
import maintenanceRoutes from "./modules/maintenance/routes/maintenance.routes.js"
export const app = express()
app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'trustcore-rental-marketplace-api',
  }) 
})
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tenant', tenantRoutes)
app.use('/api/v1/landlord', landlordRoutes)
app.use("/api/v1/invoices", invoiceRoutes)
app.use("/api/v1/bookings", bookingRoutes)
app.use("/api/v1/properties", propertyRoutes)
app.use("/api/v1/propertys", propertyRoutes)
app.use("/api/v1/lease", leaseRoutes)
app.use("/api/v1/maintenance", maintenanceRoutes)
app.use("/api/v1/complaints", complaintRoutes)
app.use("/api/v1/complaint", complaintRoutes)
app.use('/api/v1/admin/auth', adminAuthRoutes)
app.use(notFound)
app.use(errorHandler)
