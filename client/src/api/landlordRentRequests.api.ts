import { apiRequest } from './client';
import { ApiSuccess } from '../types/api.types';
import { BackendRentRequest } from './rentRequests.api';

export interface ListLandlordRentRequestsApiData {
  rentRequests: BackendRentRequest[];
}

export const landlordRentRequestApi = {
  list() {
    return apiRequest<ApiSuccess<ListLandlordRentRequestsApiData>>('/landlord/rent-requests', {
      auth: true,
    });
  },

  updateStatus(id: string, status: 'approved' | 'rejected') {
    return apiRequest<ApiSuccess<{ rentRequest: BackendRentRequest }>>(`/landlord/rent-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      auth: true,
    });
  },
};
