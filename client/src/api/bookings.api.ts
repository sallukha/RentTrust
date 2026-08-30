import { apiRequest } from './client';
import { ApiSuccess } from '../types/api.types';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';

export interface BackendBooking {
  _id?: string;
  id?: string;
  propertyId?: string;
  tenantId?: string;
  landlordId?: string;
  requestedDate?: string | Date;
  timeSlot?: string;
  status?: BookingStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingPayload {
  propertyId: string;
  landlordId: string;
  requestedDate: string;
  timeSlot: string;
  notes?: string;
}

export interface ListBookingsApiData {
  bookings: BackendBooking[];
}

export interface BookingApiData {
  booking: BackendBooking;
}

export const bookingApi = {
  list() {
    return apiRequest<ApiSuccess<ListBookingsApiData>>('/bookings', {
      auth: true,
    });
  },

  getById(id: string) {
    return apiRequest<ApiSuccess<BookingApiData>>(`/bookings/${id}`, {
      auth: true,
    });
  },

  create(payload: CreateBookingPayload) {
    return apiRequest<ApiSuccess<BookingApiData>>('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: true,
    });
  },

  updateStatus(id: string, status: 'confirmed' | 'rejected') {
    return apiRequest<ApiSuccess<BookingApiData>>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      auth: true,
    });
  },

  cancel(id: string) {
    return apiRequest<ApiSuccess<BookingApiData>>(`/bookings/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  },
};
