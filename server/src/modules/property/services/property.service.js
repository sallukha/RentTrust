import Property from '../models/property.model.js';
import { ApiError } from "../../../utils/apiError.js"

// ------------------------------------------------------------------
// SEARCH & FILTER
// ------------------------------------------------------------------

/**
 * Builds a Mongoose filter object from query params, and runs the search.
 * Supported query params: city, minPrice, maxPrice, bedrooms, propertyType, status
 */
export const searchProperties = async (query) => {
  const { city, minPrice, maxPrice, bedrooms, status, page = 1, limit = 20 } = query;

  const filter = {};

  if (city) {
    filter['address.city'] = { $regex: city, $options: 'i' }; // case-insensitive partial match
  }

  if (minPrice || maxPrice) {
    filter.pricePerMonth = {};
    if (minPrice) filter.pricePerMonth.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerMonth.$lte = Number(maxPrice);
  }

  if (bedrooms) {
    filter.bedrooms = Number(bedrooms);
  }

  // Public search only shows available listings unless a specific status is requested
  filter.status = status || 'available';

  const skip = (Number(page) - 1) * Number(limit);

  const [properties, total] = await Promise.all([
    Property.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Property.countDocuments(filter)
  ]);

  return {
    properties,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  };
};

// ------------------------------------------------------------------
// LANDLORD / OWNERSHIP VALIDATION
// ------------------------------------------------------------------

/**
 * Confirms the requesting user is allowed to create a listing.
 */
export const assertCanCreateProperty = (user) => {
  if (!['landlord', 'admin'].includes(user.role)) {
    throw new ApiError(403, 'Only landlords or admins can create property listings');
  }
};

/**
 * Confirms the requesting user owns this property, or is an admin.
 */
export const assertIsOwnerOrAdmin = (property, user) => {
  const isOwner = property.landlordId.toString() === user.id;
  const isAdmin = user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'Access denied: you do not own this property');
  }
};