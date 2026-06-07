'use server'

import { brands } from "@/db/schema";
import { db } from "@/db";
import {requireAdmin} from "@/lib/require-auth";
import {eq} from "drizzle-orm/sql/expressions/conditions";
import {BrandFormData} from "@/lib/validators/brands";


export async function createBrand(data: BrandFormData) {
    await requireAdmin();
    await db.insert(brands).values(data)
}

export async function updateBrand(id: number, data: BrandFormData) {
    await requireAdmin();
    await db.update(brands).set(data).where(eq(brands.id, id));
}