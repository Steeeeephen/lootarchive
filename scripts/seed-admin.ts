// scripts/seed-admin.ts
import "dotenv/config";
import { db } from "@/db";
import { user, account } from "@/db/auth-schema";
import { randomUUID } from "crypto";
import { hashPassword } from "better-auth/crypto";

async function seedAdmin() {
    const userId = randomUUID();
    const hashedPassword = await hashPassword("admin");

    // Insert the user row first
    await db.insert(user).values({
        id: userId,
        name: "Stephen Zalalas",
        firstName: "Stephen",
        lastName: "Zalalas",
        email: "szalalas@gmail.com",
        emailVerified: true,
        role: "admin",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // Insert the matching account row so Better Auth can authenticate with email/password
    await db.insert(account).values({
        id: randomUUID(),
        accountId: "szalalas@gmail.com", // Better Auth uses email as accountId for credentials
        providerId: "credential",           // tells Better Auth this is an email/password account
        userId: userId,                     // foreign key linking back to the user row
        password: hashedPassword,           // hashed, never plain text
        accessToken: null,
        refreshToken: null,
        idToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        scope: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    console.log("✓ Admin user seeded");
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});