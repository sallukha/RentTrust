import { apiRequest } from './client';
import { ApiSuccess } from '../types/api.types';
import {
  LoginOtpApiData,
  LoginOtpRequest,
  LoginVerifiedApiData,
  RegisterApiData,
  RegisterRequest,
} from '../types/auth.types';

export const authApi = {
  register(payload: RegisterRequest) {
    return apiRequest<ApiSuccess<RegisterApiData>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  },

  registerAdmin(payload: RegisterRequest & { adminSecret?: string }) {
    return apiRequest<ApiSuccess<RegisterApiData>>('/admin/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  },

  requestLoginOtp(payload: LoginOtpRequest) {
    return apiRequest<ApiSuccess<LoginOtpApiData>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  },

  requestAdminLoginOtp(payload: LoginOtpRequest) {
    return apiRequest<ApiSuccess<LoginOtpApiData>>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  },

  verifyLoginOtp(payload: LoginOtpRequest) {
    return apiRequest<ApiSuccess<LoginVerifiedApiData> & { token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  },

  verifyAdminLoginOtp(payload: LoginOtpRequest) {
    return apiRequest<ApiSuccess<LoginVerifiedApiData> & { token: string }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  },
};
