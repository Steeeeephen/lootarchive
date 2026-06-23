'use server'

import {requireAdmin} from "@/lib/require-auth";
import {uploadImage} from "@/lib/services/cloudinary";
import {categoryServerSchema} from "@/lib/validators/categories";
import {db} from "@/db";
import {categories} from "@/db/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";

export async function createCategory(formData: FormData) {
    await requireAdmin();

    const imageFile = formData.get("image") as File | null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile, "categories");
    }

    const raw = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        slug: formData.get("slug") as string,
        parentId: formData.get("parentId") ?? undefined,
        ...(imageUrl ? { image: imageUrl } : {}),
    };

    const data = categoryServerSchema.parse(raw);

    await db.insert(categories).values(data);
}

export async function updateCategory(id: number, formData: FormData) {
    await requireAdmin();

    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile, "categories");
    }

    const raw = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        slug: formData.get("slug") as string,
        parentId: formData.get("parentId") ?? undefined,
        ...(imageUrl && { image: imageUrl }),
    };

    const data = categoryServerSchema.parse(raw);

    await db.update(categories).set(data).where(eq(categories.id, id));

}