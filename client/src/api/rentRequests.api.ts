import { apiRequest } from './client';
import { ApiSuccess } from '../types/api.types';

export type RentRequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type RentRequestFamilyType =
  | 'BACHELOR'
  | 'FAMILY'
  | 'STUDENT'
  | 'WORKING_PROFESSIONAL';

export interface BackendRentRequest {
  _id?: string;
  id?: string;
  tenantId?: string;
  propertyId?: string;
  moveInDate?: string | Date;
  durationMonths?: number;
  occupants?: number;
  familyType?: RentRequestFamilyType;
  pets?: boolean;
  currentCity?: string;
  occupation?: string;
  organization?: string;
  monthlyIncome?: number;
  reason?: string;
  message?: string;
  status?: RentRequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRentRequestPayload {
  propertyId: string;
  moveInDate: string;
  durationMonths: number;
  occupants: number;
  familyType: RentRequestFamilyType;
  pets?: boolean;
  currentCity?: string;
  occupation: string;
  organization?: string;
  monthlyIncome?: number;
  reason?: string;
  message: string;
}

export interface ListRentRequestsApiData {
  rentRequests: BackendRentRequest[];
}

export interface CreateRentRequestApiData {
  rentRequest: BackendRentRequest;
}

export const rentRequestApi = {
  list() {
    return apiRequest<ApiSuccess<ListRentRequestsApiData>>('/tenant/rent-requests', {
      auth: true,
    });
  },

  create(payload: CreateRentRequestPayload) {
    return apiRequest<ApiSuccess<CreateRentRequestApiData>>('/tenant/rent-requests', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: true,
    });
  },
};
