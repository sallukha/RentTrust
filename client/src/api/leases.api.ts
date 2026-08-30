import { apiRequest } from './client';
import { ApiSuccess } from '../types/api.types';

export type LeaseStatus = 'draft' | 'pending_signatures' | 'active' | 'expired' | 'terminated';

export interface BackendLease {
  _id?: string;
  id?: string;
  propertyId?: string;
  landlordId?: string;
  tenantId?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  monthlyRent?: number;
  securityDeposit?: number;
  termsAndConditions?: string;
  status?: LeaseStatus;
  landlordSigned?: boolean;
  tenantSigned?: boolean;
  signedAt?: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeasePayload {
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  termsAndConditions: string;
}

export interface ListLeasesApiData {
  leases: BackendLease[];
}

export interface LeaseApiData {
  lease: BackendLease;
}

export const leaseApi = {
  list() {
    return apiRequest<ApiSuccess<ListLeasesApiData>>('/lease', {
      auth: true,
    });
  },

  getById(id: string) {
    return apiRequest<ApiSuccess<LeaseApiData>>(`/lease/${id}`, {
      auth: true,
    });
  },

  create(payload: CreateLeasePayload) {
    return apiRequest<ApiSuccess<LeaseApiData>>('/lease', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: true,
    });
  },

  sign(id: string) {
    return apiRequest<ApiSuccess<LeaseApiData>>(`/lease/${id}/sign`, {
      method: 'POST',
      auth: true,
    });
  },

  updateStatus(id: string, status: LeaseStatus) {
    return apiRequest<ApiSuccess<LeaseApiData>>(`/lease/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      auth: true,
    });
  },
};
