import { ApiError } from '../../../../utils/apiError.js'
import { loginUser, registerUser } from '../../../auth/services/auth.service.js'
import { validateAdminSignupSecret } from '../validators/admin.validators.js'

export const registerAdmin = async (payload) => {
  validateAdminSignupSecret(payload)

  return registerUser(
    {
      ...payload,
      role: 'admin',
    },
    { allowAdminRegistration: true }
  )
}

export const loginAdmin = async (payload) => {
  const result = await loginUser(
    {
      ...payload,
      role: 'admin',
    },
    { allowAdminLogin: true }
  )

  if (result.user.role !== 'admin') {
    throw new ApiError(403, 'Admin account required')
  }

  return result
}
