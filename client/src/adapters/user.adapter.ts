import { BackendUser } from '../types/auth.types';
import { UserProfile } from '../types';

export const toUserProfile = (user: BackendUser): UserProfile => ({
  id: user.id || user._id || '',
  profileType: user.role === 'landlord' ? 'landlord' : user.role === 'admin' ? 'admin' : 'tenant',
  fullName: user.name,
  email: user.email || '',
  phoneNumber: user.phone || '',
  termsAccepted: true,
  registeredAt: user.createdAt || new Date().toISOString(),
  avatarUrl: '',
  status: user.isActive ? 'active' : 'pending_verification',
});
