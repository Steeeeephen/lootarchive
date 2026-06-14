import { z } from "zod";

export const brandClientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    logo: z.instanceof(File).optional(),
});

export const brandServerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    logo: z.string().optional(),
})


export type BrandClientData = z.infer<typeof brandClientSchema>;
export type BrandServerData = z.infer<typeof brandServerSchema>;