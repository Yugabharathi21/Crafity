import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// @desc    Upload image to cloudinary
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded');
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'craftify',
    });

    // Remove file from server after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500);
    throw new Error('Image upload failed');
  }
});

export { uploadImage };