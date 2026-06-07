import "../globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "The Loot Archive",
  description: "Weapons, armor, and more!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background">
        <Nav />

        {children}

      </body>
    </html>
  );
}
