'use server'

import { brands } from "@/db/schema";
import { db } from "@/db";

export async function createBrand(data: {
    name: string;
    slug: string;
    logo?: string;
}) {
    await db.insert(brands).values(data)
}