import { z } from "zod";

export const brandSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    logo: z.string().optional(),
});

export type BrandFormData = z.infer<typeof brandSchema>;