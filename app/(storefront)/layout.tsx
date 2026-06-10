import "../globals.css";
import Nav from "@/components/Nav";
import {Metadata} from "next";

export const metadata :Metadata = {
  title: "The Loot Archive",
  description: "Weapons, armor, and more!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div className="storefront-theme min-h-screen flex flex-col bg-background">

        {children}

      </div>
  );
}
