import mongoose from 'mongoose'
import { env } from './env.js'
import { ensureModelCollections } from './registerModels.js'

export const connectDB = async () => {
  mongoose.set('strictQuery', true)

  const connection = await mongoose.connect(env.mongoUri)
  await ensureModelCollections()
  console.log(`MongoDB connected: ${connection.connection.host}`)
}
