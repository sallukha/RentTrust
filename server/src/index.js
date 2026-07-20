import { env } from './shared/config/env.js'
import { connectDB } from './shared/config/db.js'
import { app } from './app.js'

const startServer = async () => {
  await connectDB()

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`)
  })
}

startServer().catch((error) => {
  console.error('Server failed to start:', error.message)
  process.exit(1)
})
