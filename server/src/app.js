import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/routes/auth.routes.js'
import userRoutes from './modules/user/routes/user.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { notFound } from './middlewares/notFound.middleware.js'
import ownerRoutes from './modules/dashboard/owner/routes/owner.routes.js'
import invoiceRoutes from "./modules/invoice/routes/Invoice.routes.js"
import bookingRoutes from "./modules/booking/routes/booking.routes.js"
import propertyRoutes from "./modules/property/routes/property.routes.js"
import leaseRoutes from "./modules/lease/routes/Lease.routes.js"
import complaintRoutes from "./modules/complaint/routes/complaint.routes.js"
import maintenanceRoutes from "./modules/maintenance/routes/maintenance.routes.js"
import adminRoutes from './modules/dashboard/admin/routes/Admin.routes.js'
export const app = express()
app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'trustcore-rental-marketplace-api',
  })
})
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/owner', ownerRoutes)
app.use("/api/invoices", invoiceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/propertys", propertyRoutes)
app.use("/api/lease", leaseRoutes)
app.use("/api/maintenance", maintenanceRoutes)
app.use("/api/complaints", complaintRoutes)
app.use("/api/complaint", complaintRoutes)
app.use('/api/admin', adminRoutes)
app.use(notFound)
app.use(errorHandler)
