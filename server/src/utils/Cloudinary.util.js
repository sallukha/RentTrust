import fs from 'fs';
import cloudinary from '../config/Cloudinary.config.js';

/**
 * Uploads a local file (saved by Multer) to Cloudinary,
 * then removes the local temp copy regardless of success/failure.
 */
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: 'renthub/properties',
      resource_type: 'image'
    });

    fs.unlinkSync(localFilePath); // cleanup temp file after successful upload
    return response.secure_url;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // cleanup temp file even on failure
    }
    return null;
  }
};

/**
 * Deletes an image from Cloudinary using its full secure URL,
 * used when replacing or removing a property image.
 */
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Extract the public_id from the URL (folder/filename without extension)
    const segments = imageUrl.split('/');
    const fileName = segments[segments.length - 1].split('.')[0];
    const publicId = `renthub/properties/${fileName}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('[Cloudinary] Failed to delete image:', error.message);
  }
};
