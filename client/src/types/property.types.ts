export interface BackendPropertyAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface BackendPropertyLandlord {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface BackendProperty {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  landlordId?: string | BackendPropertyLandlord;
  address?: BackendPropertyAddress;
  pricePerMonth: number;
  securityDeposit: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  images?: string[];
  status?: 'available' | 'rented' | 'maintenance' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyQuery {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: BackendProperty['status'];
  landlordId?: string;
  page?: number;
  limit?: number;
}

export interface CreatePropertyRequest {
  title: string;
  description?: string;
  address: BackendPropertyAddress;
  pricePerMonth: number;
  securityDeposit: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  images: File[];
}
