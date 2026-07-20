import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/routes/auth.routes.js'
import userRoutes from './modules/user/routes/user.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { notFound } from './middlewares/notFound.middleware.js'
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

app.use(notFound)
app.use(errorHandler)
