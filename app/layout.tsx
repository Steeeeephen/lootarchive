import {Grenze_Gotisch, EB_Garamond, Press_Start_2P} from "next/font/google";
import "./globals.css";


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
      className={`${grenzeGotisch.variable} ${garamond.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
