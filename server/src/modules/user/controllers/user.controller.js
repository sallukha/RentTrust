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

export const uploadUserFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' })
  }

  const { uploadOnCloudinary } = await import('../../../utils/Cloudinary.util.js')
  const fileUrl = await uploadOnCloudinary(req.file.path)

  if (!fileUrl) {
    return res.status(500).json({ success: false, message: 'Failed to upload file to Cloudinary' })
  }

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      url: fileUrl,
    },
  })
})
