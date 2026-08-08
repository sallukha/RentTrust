import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'tenant', 'landlord'],
      default: 'tenant',
      required: true
    },
    loginOtpHash: {
      type: String,
      select: false,
    },
    loginOtpExpiresAt: {
      type: Date,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
    // Agar future me aapko Profile alag se link karni ho 
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
)

authSchema.pre('validate', function ensureIdentity() {
  if (!this.email && !this.phone) {
    this.invalidate('email', 'Email or phone is required')
  }
})

authSchema.methods.setLoginOtp = async function setLoginOtp(otp) {
  this.loginOtpHash = await bcrypt.hash(String(otp), 12)
  this.loginOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 mins
}

authSchema.methods.verifyLoginOtp = async function verifyLoginOtp(candidateOtp) {
  if (!this.loginOtpHash || !this.loginOtpExpiresAt) {
    return false
  }
  if (this.loginOtpExpiresAt.getTime() < Date.now()) {
    return false
  }
  return bcrypt.compare(String(candidateOtp), this.loginOtpHash)
}

authSchema.methods.clearLoginOtp = function clearLoginOtp() {
  this.loginOtpHash = undefined
  this.loginOtpExpiresAt = undefined
}

authSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    isActive: this.isActive,
    lastLoginAt: this.lastLoginAt,
    createdAt: this.createdAt,
  }
}

export const Auth = mongoose.model('Auth', authSchema)
