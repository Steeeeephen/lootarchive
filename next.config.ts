import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: ["better-auth", "kysely", "@better-auth/kysely-adapter"],

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;


