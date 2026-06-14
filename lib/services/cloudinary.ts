import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export async function uploadImage(file: File, folder: string) : Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

    const result = await cloudinary.uploader.upload(base64, {
        folder,
        transformation: [
            {width: 128, height: 128, crop: "pad"}
        ]
    });
    return result.secure_url;
}