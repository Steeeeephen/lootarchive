import {categories} from "@/db/schema";
import {db} from "@/db";
import {eq} from "drizzle-orm/sql/expressions/conditions";

export const getCategories = async () => {
    return db.select().from(categories).orderBy(categories.id);
}

export async function getCategoryBySlug(slug: string) {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0] ?? null;
}