import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // fs => file system used read write remove files etc

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //to find out jpeg, png, pdf, docx
    });

    //if uploaded successfully
    console.log("file uploaded to cloudinary successfully", response, url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove file from local storage if error occurs
    return null;
  }
};

export { uploadOnCloudinary };
