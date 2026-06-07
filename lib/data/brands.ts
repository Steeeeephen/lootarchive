import {db} from "@/db";
import {brands} from "@/db/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";

export const getBrands = async () => {
    return db.select().from(brands).orderBy(brands.id);
}

export async function getBrandById(id: number) {
    const result = await db.select().from(brands).where(eq(brands.id, id));
    return result[0] ?? null;
}