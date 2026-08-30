import { PropertyListing } from '../types';
import { BackendProperty, BackendPropertyLandlord } from '../types/property.types';

const fallbackImage =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80';

const toTitleCase = (value: string): string =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getLandlord = (property: BackendProperty): BackendPropertyLandlord | null =>
  property.landlordId && typeof property.landlordId === 'object' ? property.landlordId : null;

export const toPropertyListing = (property: BackendProperty): PropertyListing => {
  const id = property.id || property._id || '';
  const city = property.address?.city || 'Unknown city';
  const state = property.address?.state;
  const street = property.address?.street;
  const location = [street, city, state].filter(Boolean).join(', ');
  const price = `$${Number(property.pricePerMonth || 0).toLocaleString()}`;
  const landlord = getLandlord(property);

  return {
    id,
    title: property.title,
    shortTitle: property.title.length > 22 ? `${property.title.slice(0, 21)}...` : property.title,
    type: 'rental',
    badgeType: property.status === 'available' ? 'trusted-landlord' : 'for-rent',
    badgeLabel: property.status ? toTitleCase(property.status) : 'Verified Listing',
    location: location || city,
    city,
    neighborhood: city,
    price,
    priceNumeric: Number(property.pricePerMonth || 0),
    priceUnit: '/month',
    beds: Number(property.bedrooms || 1),
    baths: Number(property.bathrooms || 1),
    images: property.images?.length ? property.images : [fallbackImage],
    description: property.description || 'Verified rental listing on Trust Core Rental Marketplace.',
    amenities: (property.amenities || []).map((name) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      icon: 'Sparkles',
    })),
    host: {
      name: landlord?.name || 'Verified Landlord',
      avatar: '',
      reputation: 'Verified',
      verified: true,
    },
    coordinates: {
      lat: 0,
      lng: 0,
      mapX: 50,
      mapY: 50,
    },
    priceTag: price,
    isSaved: false,
  };
};

export const toPropertyListings = (properties: BackendProperty[]): PropertyListing[] =>
  properties.map(toPropertyListing);
