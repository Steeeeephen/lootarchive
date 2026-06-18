import { z } from "zod";

export const brandClientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    slug: z.string().min(1, "Slug is required"),
    logo: z.instanceof(File)
        .refine(file => file.size <= 2 * 1024 * 1024, "Logo must be less than 2MB")
        .refine(file => ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type), "Logo must be a PNG, JPG, JPEG, or WebP image"
        )
        .optional(),
});

export const brandServerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    slug: z.string().min(1, "Slug is required"),
    logo: z.string().optional(),
})


export type BrandClientData = z.infer<typeof brandClientSchema>;
export type BrandServerData = z.infer<typeof brandServerSchema>;