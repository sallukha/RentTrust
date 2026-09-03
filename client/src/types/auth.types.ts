import { ProfileType } from './index';

export interface BackendUser {
  id: string;
  _id?: string;
  name: string;
  email?: string;
  phone?: string;
  role: ProfileType | 'admin';
  isActive: boolean;
  profileId?: string;
  tenantProfileId?: string;
  landlordProfileId?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterRequest {
  name: string;
  email?: string;
  phone?: string;
  role: ProfileType;
}

export interface LoginOtpRequest {
  email?: string;
  phone?: string;
  role: ProfileType;
  otp?: string;
}

export interface RegisterApiData {
  user: BackendUser;
  otp?: string;
}

export interface LoginOtpApiData {
  user: BackendUser;
  otp?: string;
}

export interface LoginVerifiedApiData {
  user: BackendUser;
}

export interface AuthSession {
  user: BackendUser;
  token: string;
}
