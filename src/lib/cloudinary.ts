import config from "@/config";
import Cloudinary from "cloudinary";

const cloudinary = Cloudinary.v2;

cloudinary.config({
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
});

type UploadImageOptions = {
    folder?: string;
    overwrite?: boolean;
};

export const uploadImage = async (base64Image: string, options: UploadImageOptions) => {
    // const buffer = Buffer.from(base64Image, "base64");

    return await cloudinary.uploader.upload(base64Image, {
        folder: options.folder || "",
        resource_type: "image",
        overwrite: options.overwrite || true,
    });
};
