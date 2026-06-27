"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

export function LogoutButton() {
    const router = useRouter();

    return (
        <button
            className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer"
            onClick={() =>
                authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/admin/login")
                        },
                        onError: (ctx) => {
                            console.error(ctx.error)
                            toast.error("Failed to log out")
                        },
                    },
                })
            }
        >
            Log out
        </button>
    );
}