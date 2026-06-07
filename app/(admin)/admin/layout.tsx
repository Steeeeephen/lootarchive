import "../../globals.css";
import "../admin.css";
import AdminNav from "@/app/(admin)/components/AdminNav";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Metadata} from "next";
import {Toaster} from "@/components/ui/sonner";

export const metadata :Metadata = {
    title: "Admin - The Loot Archive",
    description: "Weapons, armor, and more!",
}

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <html
                lang="en"
                suppressHydrationWarning
            >
            <body className="min-h-screen flex flex-col bg-background">
                <SidebarProvider>
                        <AdminNav />
                    <SidebarTrigger></SidebarTrigger>

                    {children}
                </SidebarProvider>

                <Toaster richColors />


            </body>
            </html>

    );
}
