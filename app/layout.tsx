import {Grenze_Gotisch, EB_Garamond, Press_Start_2P, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";

export const metadata = {
  title: "The Loot Archive",
  description: "Weapons, armor, and more!",
}

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const grenzeGotisch = Grenze_Gotisch({
  subsets: ['latin'],
  variable: '--font-grenze-gotisch',
  weight: ['400', '500', '600', '700'],
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500', '700'],
})

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-pixel',
  weight: '400', // only one weight exists
})




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", grenzeGotisch.variable, garamond.variable, pressStart.variable, "font-sans", inter.variable, geistHeading.variable)}
    >
      <body className="min-h-screen flex flex-col bg-background">
        {children}
      </body>
    </html>
  );
}
