const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handleUpload = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      "data:image/jpeg;base64," + fileBuffer.toString("base64"), // Convert Buffer to base64 and include the appropriate MIME type
      {
        resource_type: "auto",
        folder: folder,
        secure: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
      }
    );
  });
};
