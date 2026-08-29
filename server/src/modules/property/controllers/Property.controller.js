
import { searchProperties, assertCanCreateProperty, assertIsOwnerOrAdmin } from "../services/property.service.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiError } from "../../../utils/apiError.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../../../utils/Cloudinary.util.js"
import mongoose from "mongoose"
import Property from "../models/property.model.js"
export const listProperties = asyncHandler(async (req, res) => {
    const { properties, pagination } = await searchProperties(req.query)
    res.status(200).json({ success: true, data: properties, pagination })
})
export const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id).populate('landlordId', 'name email phone');
    if (!property) {
        throw new ApiError(404, "Property not found");

    }
    res.status(200).json({ success: true, data: property })
})
export const createProperty = asyncHandler(async (req, res) => {
    assertCanCreateProperty(req.user);
    const {
        title,
        description,
        address,
        pricePerMonth,
        securityDeposit,
        bedrooms,
        bathrooms,
        amenities
    } = req.body

    const imageFiles = req.files || [];
    if (imageFiles.length === 0) {
        throw new ApiError(400, 'At least one property image is required');
    }
    const uploadResults = await Promise.all(imageFiles.map((file) => uploadOnCloudinary(file.path)));
    const imageUrls = uploadResults.filter((url) => url !== null);

    if (imageUrls.length === 0) {
        throw new ApiError(500, 'Failed to upload property images');
    }
    const property = await Property.create({
        title,
        description,
        landlordId: req.user.id,
        address,
        pricePerMonth,
        securityDeposit,
        bedrooms,
        bathrooms,
        amenities,
        images: imageUrls
    })

    res.status(201).json({ success: true, data: property })
})
export const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id)

    if (!property) {
        throw new ApiError(404, "Property not found");
    }
    assertIsOwnerOrAdmin(property, req.user)
    const allowedFields = [
        'title',
        'description',
        'address',
        'pricePerMonth',
        'securityDeposit',
        'bedrooms',
        'bathrooms',
        'amenities',
        'status'
    ];
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            property[field] = req.body[field];
        }
    })
    const imageFiles = req.files || [];
    if (imageFiles.length > 0) {
        const uploadResults = await Promise.all(imageFiles.map((file) => uploadOnCloudinary(file.path)));
        const newImageUrls = uploadResults.filter((url) => url !== null);

        await Promise.all(property.images.map((url) => deleteFromCloudinary(url)));

        property.images = newImageUrls;
    }
    await property.save()

    res.status(200).json({ success: true, data: property })
})

export const deleteProperty = asyncHandler(async(req, res) => {

    const property = await Property.findById(req.params.id)

    if (!property) {
        throw new ApiError(404, 'Property not found');

    }
    assertIsOwnerOrAdmin(property, req.user);
    property.status = 'inactive';
    await property.save();

    res.status(200).json({ success: true, message: 'Property archived successfully', data: property });

})
