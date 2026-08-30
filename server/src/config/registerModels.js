import mongoose from 'mongoose'

import '../modules/user/models/user.model.js'
import '../modules/user/models/userProfile.model.js'
import '../modules/user/tenant/models/tenantProfile.model.js'
import '../modules/user/tenant/models/rentRequest.model.js'
import '../modules/user/landlord/models/landlordProfile.model.js'
import '../modules/property/models/property.model.js'
import '../modules/booking/models/booking.model.js'
import '../modules/invoice/models/invoice.model.js'
import '../modules/lease/models/Lease.model.js'
import '../modules/maintenance/models/maintenance.model.js'
import '../modules/complaint/models/complaint.model.js'

export const ensureModelCollections = async () => {
  const models = mongoose.modelNames().map((modelName) => mongoose.model(modelName))

  await Promise.all(
    models.map(async (model) => {
      try {
        await model.createCollection()
      } catch (error) {
        if (error?.code !== 48 && error?.codeName !== 'NamespaceExists') {
          throw error
        }
      }

      await model.createIndexes()
    })
  )
}
