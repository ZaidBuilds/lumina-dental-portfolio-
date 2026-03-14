import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Dental | Premium Experience",
  description: "Next-generation scrollytelling dental clinic demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
