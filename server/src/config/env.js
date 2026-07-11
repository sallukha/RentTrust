import dotenv from 'dotenv'

dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trustcore',
  jwtSecret: process.env.JWT_SECRET || 'change-this-secret-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminSignupSecret: process.env.ADMIN_SIGNUP_SECRET || '',
}

if (env.nodeEnv === 'production' && env.jwtSecret === 'change-this-secret-in-production') {
  throw new Error('JWT_SECRET must be set in production')
}
