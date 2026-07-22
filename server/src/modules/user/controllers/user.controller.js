import { User } from '../models/user.model.js'
import { asyncHandler } from '../../../utils/asyncHandler.js'

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: users.length,
    data: {
      users: users.map((user) => user.toSafeObject()),
    },
  })
})

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user.toSafeObject(),
    },
  })
})