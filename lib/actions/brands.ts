'use server'

import { brands } from "@/db/schema";
import { db } from "@/db";
import {requireAdmin} from "@/lib/require-auth";
import {eq} from "drizzle-orm/sql/expressions/conditions";
import {brandServerSchema} from "@/lib/validators/brands";
import {uploadImage} from "@/lib/services/cloudinary";


export async function createBrand(formData: FormData) {
    await requireAdmin();

    const logoFile = formData.get("logo") as File | null;
    let logoUrl = null;

    if (logoFile && logoFile.size > 0) {
        logoUrl = await uploadImage(logoFile, "brands");
    }

    const raw = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        slug: formData.get("slug") as string,
        ...(logoUrl ? { logo: logoUrl } : {}),
    };

    const data = brandServerSchema.parse(raw);

    await db.insert(brands).values(data)
}

export async function updateBrand(id: number, formData: FormData) {
    await requireAdmin();

    const logoFile = formData.get("logo") as File | null;
    let logoUrl: string | undefined;

    if (logoFile && logoFile.size > 0) {
        logoUrl = await uploadImage(logoFile, "brands");
    }

    const raw = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        slug: formData.get("slug") as string,
        ...(logoUrl && { logo: logoUrl }),
    };

    const data = brandServerSchema.parse(raw);

    await db.update(brands).set(data).where(eq(brands.id, id));
}