import dotenv from 'dotenv';
dotenv.config();
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: dotenv.config().parsed.CLOUD_NAME,
    api_key: dotenv.config().parsed.API_KEY,
    api_secret: dotenv.config().parsed.API_SECRET,
})

export default cloudinary;