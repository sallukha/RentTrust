import { apiRequest } from './client';
import { ApiSuccess, PaginatedApiSuccess } from '../types/api.types';
import { BackendProperty, CreatePropertyRequest, PropertyQuery } from '../types/property.types';

const toQueryString = (query?: PropertyQuery): string => {
  if (!query) return '';
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
};

const toPropertyFormData = (payload: CreatePropertyRequest): FormData => {
  const formData = new FormData();

  formData.set('title', payload.title);
  if (payload.description) formData.set('description', payload.description);
  formData.set('address', JSON.stringify(payload.address));
  formData.set('pricePerMonth', String(payload.pricePerMonth));
  formData.set('securityDeposit', String(payload.securityDeposit));
  if (payload.bedrooms !== undefined) formData.set('bedrooms', String(payload.bedrooms));
  if (payload.bathrooms !== undefined) formData.set('bathrooms', String(payload.bathrooms));
  if (payload.amenities) formData.set('amenities', JSON.stringify(payload.amenities));

  payload.images.forEach((file) => formData.append('images', file));

  return formData;
};

export const propertiesApi = {
  list(query?: PropertyQuery) {
    return apiRequest<PaginatedApiSuccess<BackendProperty[]>>(`/properties${toQueryString(query)}`, {
      auth: false,
    });
  },

  listByLandlord(landlordId: string, query?: Omit<PropertyQuery, 'landlordId'>) {
    return this.list({ ...query, landlordId });
  },

  getById(id: string) {
    return apiRequest<ApiSuccess<BackendProperty>>(`/properties/${id}`, {
      auth: false,
    });
  },

  create(payload: CreatePropertyRequest) {
    return apiRequest<ApiSuccess<BackendProperty>>('/properties', {
      method: 'POST',
      body: toPropertyFormData(payload),
    });
  },
};
