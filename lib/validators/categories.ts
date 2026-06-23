import {z} from "zod";

export const categoryClientSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    parentId: z.number().optional(),
    image: z.instanceof(File)
        .refine(file => file.size <= 2 * 1024 * 1024, "Image must be less than 2MB")
        .refine(file => ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type), "Image must be a PNG, JPG, JPEG, or WebP image"
        )
        .optional(),
});

export const categoryServerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    parentId: z.coerce.number().optional(),
    image: z.string().optional(),
})