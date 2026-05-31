import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '@/db'


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

        user: {
            additionalFields: {
                firstName: {
                    type: "string",
                    required: true
                },
                lastName: {
                    type: "string",
                    required: true
                },
                role: {
                    type: "string",
                    required: true,
                    defaultValues: "customer"
                },
            }
        }
});