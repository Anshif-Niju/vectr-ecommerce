import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const getCloudinaryConfig = () => {
  const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_FOLDER,
  } = process.env;

  return {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
    folder: CLOUDINARY_FOLDER,
  };
};

const configureCloudinary = () => {
  const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();

  if (!cloudName || !apiKey || !apiSecret) {
    return { configured: false, folder };
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return { configured: true, folder };
};

const buildPublicId = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const baseName =
    path
      .basename(originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'product';

  return `${baseName}-${Date.now()}`;
};

export const uploadProductImageToCloudinary = (file) => {
  const { configured, folder } = configureCloudinary();

  if (!configured) {
    throw new Error(
      'Cloudinary env vars are missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder || 'vectr/products',
        public_id: buildPublicId(file.originalname),
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(file.buffer);
  });
};
